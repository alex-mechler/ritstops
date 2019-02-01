const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT username, score FROM discord_user WHERE visible != FALSE ORDER BY score DESC');
	res.send({err: false, message: '', result: rows});
});

router.get('/seasonal', async(req, res) => {
	const {rows} = await db.query('SELECT username, seasonal_score FROM discord_user WHERE visible != FALSE ORDER BY seasonal_score DESC');
	res.send({err: false, message: '', result: rows});
});