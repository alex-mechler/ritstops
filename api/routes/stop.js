const Router = require('express-promise-router');

const db = require('../util/db');
const router = new Router();

module.exports = router;

router.get('/', async(req, res) => {
	const {rows} = await db.query('SELECT id, name, loc FROM stop');
	res.send(rows);
});

router.get('/:id', async(req, res) => {
	const {rows} = await db.query('SELECT id, name, loc FROM stop WHERE id = $1', [req.params.id]);
	if(rows.length == 1){
		res.send(rows[0]);
	}else{
		res.send({err: true, message: 'No such stop'});
	}
});

router.post('/', async(req, res) => {
	const name = req.body.name;
	const lat = Number(req.body.lat);
	const long = Number(req.body.long);
	console.log(long);
	if(name == undefined){
		res.send({err: true, message: 'Invalid name'});
		return;
	}
	if(lat == undefined || isNaN(lat)) {
		res.send({err: true, message: 'Invalid lat'});
		return;
	}
	if(long == undefined || isNaN(long)) {
		res.send({err: true, message: 'Invalid long'});
		return;
	}
	var {rows} = await db.query('SELECT COUNT(id) FROM stop WHERE name = $1', [name]);
	if(rows[0].count != 0){
		res.send({err: true, message: 'A stop of that name already exists!'});
		return;
	}
	await db.query('INSERT INTO stop (name, loc) VALUES ($1, point($2, $3))', [name, lat, long]);
	var {rows} = await db.query('SELECT id, name, loc FROM stop WHERE name = $1', [name]);
	res.send({err: false, message: '', result: rows[0]});
});