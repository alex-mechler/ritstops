const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT id, reward, shiny, icon FROM reward');
	res.send({err: false, message: '', result: rows});
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT id, reward, shiny, icon FROM reward WHERE id = $1', [req.params.id]);
	if(rows.length == 1) {
		res.send({err: false, message: '', result: rows});
	} else {
		res.send({err: true, message: 'No such reward', result: {}});
	}
});