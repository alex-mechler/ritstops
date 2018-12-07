module.exports = {
	isLoggedIn: (req, res, next) => {
		if(req.isAuthenticated()) next();
		else res.send({err: true, message: 'You must be logged in to do that', result:{}});
	}
}