const Router = require('express-promise-router');

const db = require('../util/db');
const auth = require('../util/auth');
const router = new Router();

module.exports = router;

router.get('/', auth.isLoggedIn, async(req, res) => {
	res.send({err: false, message: '', result: req.user});
});

router.get('/preferences', auth.isLoggedIn, async(req, res) => {
	const {rows} = await db.query('SELECT preferences FROM discord_user WHERE email=$1', [req.user.email]);
	if(rows.length == 1) {
		res.send({err: false, message: '', result: rows[0]});
	} else {
		res.send({err: true, message: 'Unexpected user', result: {}});
	}
});

router.post('/preferences', auth.isLoggedIn, async(req, res) => {
	if(req.body.preferences === undefined) {
		res.send({err:true, message: 'Invalid preferences', result: {}});
		return;
	} else {
		await db.query('UPDATE discord_user SET preferences=$1 WHERE email=$2', [req.body.preferences, req.user.email]);
		const {rows} = await db.query('SELECT preferences FROM discord_user WHERE email=$1', [req.user.email]);
		if(rows.length == 1) {
			res.send({err: false, message: '', result: rows[0]});
		} else {
			res.send({err: true, message: 'Unexpected user', result: {}});
		}
	}
});