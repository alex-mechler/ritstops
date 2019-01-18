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

router.post('/', auth.isLoggedIn, async(req, res) => {
	const stop = req.body.stop;
	const quest = req.body.quest;
	var reward = req.body.reward;
	if(reward === undefined){
		reward = 0;
	}
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
	var {rows} = await db.query('SELECT COUNT(id) FROM reward WHERE id = $1', [reward]);
	if(rows[0]['count'] != 1) {
		res.send({err: true, message: 'Invalid Reward ID', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM quest_reward WHERE quest_id=$1 AND reward_id=$2', [quest, reward]);
	if(rows[0]['count'] != 1) {
		res.send({err: true, message: 'Invalid Reward for that Quest', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT reward_id FROM report WHERE stop_id=$1 AND user_id=$2', [stop, req.user.id]);
	if(rows[0] !== undefined && (Number(rows[0]['reward_id']) != 0 || (Number(rows[0]['reward_id'] == 0 && reward == 0)))) {
		res.send({err: true, message: 'You have already reported that stop!', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM report WHERE stop_id=$1 AND user_id=$2', [stop, req.user.id]);
	if(rows[0]['count'] == 1) {
		//update report
		await db.query('UPDATE report SET reward_id=$1 WHERE stop_id=$2 AND user_id=$3', [reward, stop, req.user.id]);
	} else {
		//new report
		await db.query('INSERT INTO report (user_id, stop_id, quest_id, reward_id) VALUES ($1, $2, $3, $4)', [req.user.id, stop, quest, reward]);
	}
	await db.query('UPDATE discord_user SET score = score + 1 WHERE id=$1', [req.user.id]);
	var {rows} = await db.query('SELECT rp.id, rp.stop_id, rp.quest_id, rp.reward_id, s.name, s.loc, q.quest, rw.reward, rw.shiny, rw.icon FROM report AS rp JOIN stop AS s ON s.id=rp.stop_id JOIN quest AS q ON q.id=rp.quest_id JOIN reward AS rw ON rw.id=rp.reward_id WHERE s.id=$1 AND rp.user_id=$2', [stop, req.user.id]);
	res.send({err: false, message: '', result: rows});
});