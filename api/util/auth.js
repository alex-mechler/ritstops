const db = require('./db');

module.exports = {
	isLoggedIn: async (req, res, next) => {
		if(req.body.api_key){
			const {rowCount} = await db.query('SELECT * FROM api_key WHERE key=$1', [req.body.api_key]);
			if(rowCount > 0) {
				next();
				return;
			} else {
				res.send({err: true, message: 'invalid api key', result:{}});
				return;
			}
		}
		if(req.isAuthenticated()) { 
			next();
			return;
		} else {
			res.send({err: true, message: 'You must be logged in to do that', result:{}});
			return;
		}
	}
}