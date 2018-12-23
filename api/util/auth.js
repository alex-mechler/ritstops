const db = require('./db');

async function getUserFromAPIKey(api_key){
	const {rows} = await db.query("SELECT * FROM discord_user WHERE api_key=$1", [api_key]);
	if(rows.length === 1) {
		return rows[0];
	} else {
		return undefined;
	}
}

module.exports = {
	isLoggedIn: async (req, res, next) => {
		if(req.body.api_key){
			var user = await getUserFromAPIKey(req.body.api_key);
			if(user !== undefined){
				req.user = user;
				next();
				return;
			} else {
				res.send({err: true, message: 'Invalid API key', result:{}});
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