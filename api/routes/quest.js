const Router = require('express-promise-router');
const EventManager = require('../../services/EventManager');
const _ = require('lodash');

const db = require('../util/db');
const router = new Router();
const eventManager = new EventManager();

module.exports = router;

router.get('/', async (req, res) => {
    eventManager.refresh();

    const currentEventKeys = eventManager.currentEventKeys();
    let filter;

    if (currentEventKeys.length === 0) {
        filter = 'event IS NULL';
    } else {
        // If there are no current events, throw a -1 in there just to make sure the IN clause isn't empty
        const currentIds = _.map(currentEventKeys, eventKey => {
            return `'${eventKey}'`;
        }).join(', ');

        const inStatement = `event IN(${currentIds})`;
        filter = eventManager.includeDefault ? `(${inStatement} OR event IS NULL)` : inStatement;
    }

    const sqlStatement = `SELECT id, reward, quest, icon, shiny FROM quest WHERE ${filter} ORDER BY quest ASC`;

    const {rows} = await db.query(sqlStatement);
    res.send({err: false, message: '', result: rows});
});

router.get('/:id', async (req, res) => {
    const {rows} = await db.query('SELECT id, reward, quest, icon FROM quest WHERE id = $1', [req.params.id]);
    if (rows.length == 1) {
        res.send({err: false, message: '', result: rows});
    } else {
        res.send({err: true, message: 'No such quest', result: {}});
    }
});

/*
router.post('/', async(req, res) => {
	const reward = req.body.reward;
	const quest = req.body.quest;
	const icon = req.body.icon;
	if(reward == undefined) {
		res.send({err: true, message: 'Invalid reward', result: {}});
		return;
	}
	if(quest == undefined) {
		res.send({err: true, message: 'Invalid quest', result: {}});
		return;
	}
	if(icon == undefined) {
		res.send({err: true, message: 'Invalid icon', result: {}});
		return;
	}
	await db.query('INSERT INTO quest (reward, quest, icon) VALUES ($1, $2, $3)', [reward, quest, icon]);
	var {rows} = await db.query('SELECT id, reward, quest FROM quest WHERE quest = $1', [quest]);
	res.send({err: false, message: '', result: rows});
});
*/
