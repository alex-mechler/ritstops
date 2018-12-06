require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;

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
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false
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
	function(req, res) {res.redirect('/')}
);
app.get('/api/auth/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/', function(req, res) {
	res.send(req.user);
})

app.listen(port);

console.log('Stop Map RESTful API server started on: ' + port);