const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT qr.id, qr.quest_id, qr.reward_id, q.quest, r.reward, r.shiny, r.icon FROM quest_reward AS qr JOIN quest AS q ON q.id=qr.quest_id JOIN reward AS r ON r.id=qr.reward_id');
	res.send({err: false, message: '', result: rows});
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT qr.id, qr.quest_id, qr.reward_id, q.quest, r.reward, r.shiny, r.icon FROM quest_reward AS qr JOIN quest AS q ON q.id=qr.quest_id JOIN reward AS r ON r.id=qr.reward_id WHERE qr.id = $1', [req.params.id]);
	if(rows.length == 1) {
		res.send({err: false, message: '', result: rows});
	} else {
		res.send({err: true, message: 'No such quest', result: {}});
	}
});