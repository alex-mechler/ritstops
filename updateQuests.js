require('dotenv').config();

const db = require('./api/util/db.js');
const quests = require('./data/quests.json');
const stops = require('./data/stops.json');

async function updateQuests() {
    try {
        await db.query("DROP TABLE stop,quest");
    } catch (e) {}

    await db.query("CREATE TABLE quest (id SERIAL PRIMARY KEY, reward VARCHAR(50), quest VARCHAR(100), icon VARCHAR(100), event CHAR(32))");
    await db.query("CREATE TABLE stop (id SERIAL PRIMARY KEY, name VARCHAR(50), loc POINT, quest_id INT DEFAULT 1, confirmed BOOLEAN DEFAULT FALSE, FOREIGN KEY (quest_id) REFERENCES quest(id))");

    console.log("Created tables");

    const quests_count = quests.length;
    for (let i = 0; i < quests_count; i++) {
        const event_value = quests[i].hasOwnProperty('event') ? quests[i]['event'] : null;
        await db.query("INSERT INTO quest (reward, quest, icon, event) VALUES ($1, $2, $3, $4)", [quests[i]['reward'], quests[i]['quest'], quests[i]['icon'], event_value]);
    }

    console.log("Quests Imported");

    const stops_count = stops.length;
    for (let i = 0; i < stops_count; i++) {
        await db.query("INSERT INTO stop (name, loc) VALUES ($1, point($2, $3))", [stops[i]['name'], stops[i]['lat'], stops[i]['long']]);
    }

    console.log("Stops Imported");
}

updateQuests().then(() => {
    console.log("Script ran successfully");
    process.exit();
}, err => {
    console.log("An error occurred: " + err);
    process.exit();
});
