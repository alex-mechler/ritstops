const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) =>{
	const {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id');
  res.send(rows);
});

router.post('/', async(req, res) => {
	const stop = req.body.stop;
	const quest = req.body.quest;
	var {rows} = await db.query('SELECT COUNT(id) FROM stop WHERE id = $1', [stop]);
	if(rows[0]['count'] != 1){
		res.send({err: true, message: 'Invalid Stop ID'});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM quest WHERE id = $1', [quest]);
	if(rows[0]['count'] != 1){
		res.send({err: true, message: 'Invalid Quest ID'});
		return;
	}
	var {rows} = await db.query('SELECT quest_id FROM stop WHERE id = $1', [stop]);
	if(rows[0]['quest_id'] != 1){
		res.send({err: true, message: 'Stop has already been reported'});
		return;
	}
	await db.query('UPDATE stop SET quest_id = $1 WHERE id = $1', [quest]);
	res.send({err: false, message: ''});
});