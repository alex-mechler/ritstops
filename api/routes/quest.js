const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT id, reward, quest FROM quest');
	res.send({err: false, message: '', result: rows});
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT id, reward, quest FROM quest WHERE id = $1', [req.params.id]);
	if(rows.length == 1) {
		res.send({err: true, message: '', result: rows});
	} else {
		res.send({err: true, message: 'No such quest', result: {}});
	}
});

router.post('/', async(req, res) => {
	const reward = req.body.reward;
	const quest = req.body.quest;
	if(reward == undefined) {
		res.send({err: true, message: 'Invalid reward', result: {}});
		return;
	}
	if(quest == undefined) {
		res.send({err: true, message: 'Invalid quest', result: {}});
		return;
	}
	await db.query('INSERT INTO quest (reward, quest) VALUES ($1, $2)', [reward, quest]);
	var {rows} = await db.query('SELECT id, reward, quest FROM quest WHERE quest = $1', [quest]);
	res.send({err: false, message: '', result: rows});
});