require('dotenv').config();

const db = require('./api/util/db.js');

wipe();

async function wipe(){ 
	await db.query('UPDATE stop SET quest_id=1, confirmed=false');
}