const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/all', async (req, res) => {
  const {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id');
  res.send(rows);
});

router.get('/trashless', async(req, res) => {
	const {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id WHERE quest.id != 2')
	res.send(rows);
});

router.get('/trashless/confirmed', async(req, res) => {
	const {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id WHERE quest.id != 2 AND stop.confirmed = TRUE')
	res.send(rows);
});

router.get('/confirmed', async(req,res) => {
	const {rows} = await db.query('SELECT stop.name, stop.loc, quest.reward, quest.quest, stop.confirmed FROM stop JOIN quest ON stop.quest_id = quest.id WHERE stop.confirmed = TRUE');
	res.send(rows);
});

router.get('/confirmed/trashless', async(req,res) => {
	res.redirect('/api/research/trashless/confirmed');
});