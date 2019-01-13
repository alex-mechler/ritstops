require('dotenv').config();

const db = require('./api/util/db.js');

createTables();

async function createTables(){
	await db.query("CREATE TABLE quest (id SERIAL PRIMARY KEY, reward VARCHAR(50), quest VARCHAR(100), icon VARCHAR(100))");
	await db.query("CREATE TABLE stop (id SERIAL PRIMARY KEY, name VARCHAR(50), loc POINT, quest_id INT DEFAULT 1, confirmed BOOLEAN DEFAULT FALSE, FOREIGN KEY (quest_id) REFERENCES quest(id))");
	await db.query("CREATE TABLE session (sid varchar NOT NULL COLLATE \"default\", sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE)");
	await db.query("ALTER TABLE session ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE");
	await db.query("CREATE TABLE discord_user (email VARCHAR(50) PRIMARY KEY, username VARCHAR(50) NOT NULL, api_key CHAR(32) NOT NULL, avatar CHAR(32), preferences JSONB, score INT DEFAULT 0, donation_amount INT DEFAULT 0, permissions BIGINT DEFAULT 0)");
	console.log("Tables Created, run updateQuests to populate quest and stop tables");
	process.exit();
}