const Router = require('express-promise-router');

const db = require('../util/db');
const auth = require('../util/auth');

const router = new Router();

module.exports = router;

router.get('/', async(req, res) =>{
	const {rows} = await db.query('SELECT rp.id, rp.stop_id, rp.quest_id, rp.reward_id, s.name, s.loc, q.quest, rw.reward, rw.shiny, rw.icon FROM report AS rp JOIN stop AS s ON s.id=rp.stop_id JOIN quest AS q ON q.id=rp.quest_id JOIN reward AS rw ON rw.id=rp.reward_id');
  res.send({err: false, message: '', result: rows});
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT rp.id, rp.stop_id, rp.quest_id, rp.reward_id, s.name, s.loc, q.quest, rw.reward, rw.shiny, rw.icon FROM report AS rp JOIN stop AS s ON s.id=rp.stop_id JOIN quest AS q ON q.id=rp.quest_id JOIN reward AS rw ON rw.id=rp.reward_id WHERE rp.id=$1', [req.params.id]);
	if(rows.length == 1) {
		res.send({err: false, message: '', result: rows});
	} else {
		res.send({err: true, message: 'No such report', result: {}});
	}
});

/*
router.post('/', auth.isLoggedIn, async(req, res) => {
	const stop = req.body.stop;
	const quest = req.body.quest;
	var {rows} = await db.query('SELECT COUNT(id) FROM stop WHERE id = $1', [stop]);
	if(rows[0]['count'] != 1) {
		res.send({err: true, message: 'Invalid Stop ID', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM quest WHERE id = $1', [quest]);
	if(rows[0]['count'] != 1) {
		res.send({err: true, message: 'Invalid Quest ID', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT quest_id FROM stop WHERE id = $1', [stop]);
	if(Number(rows[0]['quest_id']) != 1) {
		res.send({err: true, message: 'Stop has already been reported', result: {}});
		return;
	}
	await db.query('UPDATE stop SET quest_id = $1 WHERE id = $2', [quest, stop]);
	await db.query("UPDATE discord_user SET score = score + 1 WHERE email=$1", [req.user.email]);
	var {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id WHERE stop.id = $1', [stop]);
	res.send({err: false, message: '', result: rows});
});
*/