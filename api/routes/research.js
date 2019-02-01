const Router = require('express-promise-router');

const db = require('../util/db');
const auth = require('../util/auth');

const router = new Router();

module.exports = router;

router.get('/', async(req, res) =>{
	const {rows} = await db.query('SELECT stop.id, stop.name, stop.loc, stop.quest_id, quest.reward, quest.quest, stop.confirmed, quest.icon FROM stop JOIN quest ON stop.quest_id = quest.id');
  res.send({err: false, message: '', result: rows});
});

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
	await db.query("UPDATE discord_user SET score = score+1, seasonal_score=seasonal_score+1 WHERE email=$1", [req.user.email]);
	var {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id WHERE stop.id = $1', [stop]);
	res.send({err: false, message: '', result: rows});
});