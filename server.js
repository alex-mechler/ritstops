require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
var pgSession = require('connect-pg-simple')(session);
var cron = require('node-cron');
const db = require('./api/util/db');

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var scopes = ['identify', 'email', 'guilds'];

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
	cookie: {maxAge: 30 * 24 * 60 * 60 * 10000, domain: process.env.COOKE_DOMAIN}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const research = require('./api/routes/research');
app.use('/api/research', research);

const stop = require('./api/routes/stop');
app.use('/api/stop', stop);

const quest = require('./api/routes/quest');
app.use('/api/quest', quest);

app.get('/api/auth/login', passport.authenticate('discord', {scope: scopes}), function(req, res) {});
app.get('/api/auth/callback', 
	passport.authenticate('discord', {failureRedirect: '/'}),
	function(req, res) {
		const guilds = req.user.guilds;
		var foundGuild = false;
		for(i in guilds){
			if(guilds[i].id == process.env.DISCORD_SERVER_ID){
				foundGuild = true;
			}
		}
		if(foundGuild == true){
			res.redirect(process.env.LOGIN_SUCCESS_REDIRECT);
		}else{
			req.logout();
			res.redirect(process.env.LOGIN_FAIL_REDIRECT);
		}
	}
);
app.get('/api/auth/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/api/auth/user', function(req, res) {
	res.send(req.user);
});

app.listen(port);

console.log('Stop Map RESTful API server started on: ' + port);