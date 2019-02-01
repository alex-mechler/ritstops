require('dotenv').config();

const db = require('./api/util/db.js');

createTables();

async function createTables(){
	await db.query("CREATE TABLE session (sid varchar NOT NULL COLLATE \"default\", sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE)");
	await db.query("ALTER TABLE session ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE");
	await db.query("CREATE TABLE discord_user (id SERIAL PRIMARY KEY, email VARCHAR(50) UNIQUE, username VARCHAR(50) NOT NULL, discord_id VARCHAR(32), api_key CHAR(32) NOT NULL, avatar CHAR(32), preferences JSONB, score INT DEFAULT 0, seasonal_score INT DEFAULT 0, donation_amount INT DEFAULT 0, visible BOOLEAN DEFAULT TRUE)");
	console.log("Tables Created, run updateQuests to populate quest and stop tables");
	process.exit();
}