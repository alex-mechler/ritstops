const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT id, name, loc FROM stop');
	res.send({err: false, message: '', result: rows});
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT id, name, loc FROM stop WHERE id = $1', [req.params.id]);
	if(rows.length == 1) {
		res.send({err: true, message: '', result: rows});
	} else {
		res.send({err: true, message: 'No such stop', result: {}});
	}
});

/*
router.post('/', async(req, res) => {
	const name = req.body.name;
	const lat = Number(req.body.lat);
	const long = Number(req.body.long);
	if(name == undefined) {
		res.send({err: true, message: 'Invalid name', result: {}});
		return;
	}
	if(lat == undefined || isNaN(lat)) {
		res.send({err: true, message: 'Invalid lat', result: {}});
		return;
	}
	if(long == undefined || isNaN(long)) {
		res.send({err: true, message: 'Invalid long', result: {}});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM stop WHERE name = $1', [name]);
	if(rows[0].count != 0) {
		res.send({err: true, message: 'A stop of that name already exists', result: {}});
		return;
	}
	await db.query('INSERT INTO stop (name, loc) VALUES ($1, point($2, $3))', [name, lat, long]);
	var {rows} = await db.query('SELECT id, name, loc FROM stop WHERE name = $1', [name]);
	res.send({err: false, message: '', result: rows});
});
*/