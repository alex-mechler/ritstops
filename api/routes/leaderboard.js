const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT username, score, avatar, discord_id FROM discord_user WHERE visible != FALSE AND score > 0 ORDER BY score DESC');
	res.send({err: false, message: '', result: rows});
});

router.get('/seasonal', async(req, res) => {
	const {rows} = await db.query('SELECT username, seasonal_score AS score, avatar, discord_id FROM discord_user WHERE visible != FALSE AND seasonal_score > 0 ORDER BY seasonal_score DESC');
	res.send({err: false, message: '', result: rows});
});