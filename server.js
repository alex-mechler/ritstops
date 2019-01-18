require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
var pgSession = require('connect-pg-simple')(session);
var cron = require('node-cron');
var hat = require('hat');
var rack = hat.rack();
const db = require('./api/util/db');

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(async function(obj, done) {
	const {rows} = await db.query("SELECT * FROM discord_user WHERE email=$1", [obj.email]);
	if(rows.length == 1){
		done(null, rows[0]);
		return;
	}
	done({message: 'test'}, null);
});

var scopes = ['identify', 'email', 'guilds'];

cron.schedule('0 0 * * *', () => {
  console.log('Resetting the stops');
	db.query('UPDATE stop SET quest_id=1, confirmed=false');
}, {
   timezone: process.env.TIMEZONE
});

passport.use(new DiscordStrategy({
	clientID: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	callbackURL: process.env.DISCORD_CALLBACK_URL,
	scope: scopes
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		return done(null, profile);
	})
}));

app.use(session({
	store: new pgSession({
		pool: require('./api/util/db').pool
	}),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 30 * 24 * 60 * 60 * 10000, domain: process.env.COOKIE_DOMAIN}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const stop = require('./api/routes/stop');
app.use('/*/stop', stop);

const quest = require('./api/routes/quest');
app.use('/*/quest', quest);

const reward = require('./api/routes/reward');
app.use('/*/reward', reward);

const quest_reward = require('./api/routes/quest_reward');
app.use('/*/quest_reward', quest_reward);

const report = require('./api/routes/report');
app.use('/*/report', report);

const user = require('./api/routes/user');
app.use('/*/user', user);

app.get('/*/auth/login', passport.authenticate('discord', {scope: scopes}), function(req, res) {});

app.get('/*/auth/callback', 
	passport.authenticate('discord', {failureRedirect: '/'}),
	async function(req, res) {
		const guilds = req.user.guilds;
		var foundGuild = false;
		for(i in guilds){
			if(guilds[i].id == process.env.DISCORD_SERVER_ID){
				foundGuild = true;
			}
		}
		if(foundGuild == true){
			const {rowCount} = await db.query("SELECT * FROM discord_user WHERE email=$1", [req.user.email]);
			if(rowCount == 0){
				var key = rack();
				await db.query("INSERT INTO discord_user (email, username, discord_id, api_key, avatar) VALUES ($1, $2, $3, $4, $5)", [req.user.email, req.user.username, req.user.id, key, req.user.avatar]);
			} else {
				await db.query("UPDATE discord_user SET avatar=$1 WHERE email=$2", [req.user.avatar, req.user.email]);
			}
			res.redirect(process.env.LOGIN_SUCCESS_REDIRECT);
		}else{
			req.logout();
			res.redirect(process.env.LOGIN_FAIL_REDIRECT);
		}
	}
);

app.get('/*/auth/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(port);

console.log('Stop Map RESTful API server started on: ' + port);