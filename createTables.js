require('dotenv').config();

const db = require('./api/util/db.js');

var stops = [
  {
    "name": "University Commons",
    "lat": 43.079686999999964,
    "long": -77.68256400000016
  },
  {
    "name": "Red Barn",
    "lat": 43.084354,
    "long": -77.684514
  },
  {
    "name": "Display of Grace",
    "lat": 43.085411,
    "long": -77.681918
  },
  {
    "name": "Windmills",
    "lat": 43.08564500000031,
    "long": -77.6809729999998
  },
  {
    "name": "CAST Girder",
    "lat": 43.08515299999967,
    "long": -77.67987600000008
  },
  {
    "name": "North GCCIS",
    "lat": 43.084734,
    "long": -77.67997
  },
  {
    "name": "Sillicon Ingot",
    "lat": 43.08429900000013,
    "long": -77.67913499999992
  },
  {
    "name": "South GCCIS",
    "lat": 43.08371500000004,
    "long": -77.6796040000003
  },
  {
    "name": "GV",
    "lat": 43.082931,
    "long": -77.679605
  },
  {
    "name": "GV Fountain",
    "lat": 43.083198,
    "long": -77.678468
  },
  {
    "name": "Gosnell Atrium",
    "lat": 43.083562999999,
    "long": -77.67735100000034
  },
  {
    "name": "Susie Lewis",
    "lat": 43.08311399999976,
    "long": -77.67693100000032
  },
  {
    "name": "Marie Nitzman",
    "lat": 43.08384400000034,
    "long": -77.67591799999992
  },
  {
    "name": "Java Wallys",
    "lat": 43.08412799999969,
    "long": -77.6763019999998
  },
  {
    "name": "Tau Beta Pi",
    "lat": 43.084245999999766,
    "long": -77.6773929999996
  },
  {
    "name": "Kate Gleason Bust",
    "lat": 43.08427499999976,
    "long": -77.67860599999979
  },
  {
    "name": "Rocky Zen",
    "lat": 43.085192999999634,
    "long": -77.67879299999994
  },
  {
    "name": "Pi Quad",
    "lat": 43.085166000000385,
    "long": -77.67840900000009
  },
  {
    "name": "Puu-Chang",
    "lat": 43.08579399999979,
    "long": -77.67739099999983
  },
  {
    "name": "Triple Barrel",
    "lat": 43.08493699999976,
    "long": -77.67748799999993
  },
  {
    "name": "Women In Arms",
    "lat": 43.08522100000035,
    "long": -77.67689099999991
  },
  {
    "name": "Squiggle Bench",
    "lat": 43.085094,
    "long": -77.676837
  },
  {
    "name": "Eastman Quad",
    "lat": 43.08464,
    "long": -77.676451
  },
  {
    "name": "Yasuji Tojo",
    "lat": 43.084906,
    "long": -77.675743
  },
  {
    "name": "Artful Bench",
    "lat": 43.085125,
    "long": -77.675464
  },
  {
    "name": "Lynn Skvarek",
    "lat": 43.085768,
    "long": -77.675507
  },
  {
    "name": "Time Capsule",
    "lat": 43.085047,
    "long": -77.674305
  },
  {
    "name": "SAU",
    "lat": 43.084138,
    "long": -77.674563
  },
  {
    "name": "Polisseni",
    "lat": 43.083135,
    "long": -77.674778
  },
  {
    "name": "Gazebo",
    "lat": 43.082618,
    "long": -77.672675
  },
  {
    "name": "Spider",
    "lat": 43.081944,
    "long": -77.671387
  },
  {
    "name": "Interfaith",
    "lat": 43.084123,
    "long": -77.673597
  },
  {
    "name": "Legacy Walk",
    "lat": 43.084311,
    "long": -77.672975
  },
  {
    "name": "Greek Rock",
    "lat": 43.084091,
    "long": -77.672846
  },
  {
    "name": "Tiger Chair",
    "lat": 43.085314,
    "long": -77.672739
  },
  {
    "name": "Marcia Ellingson Courtyard",
    "lat": 43.084264,
    "long": -77.672288
  },
  {
    "name": "Kevin Smith",
    "lat": 43.084373,
    "long": -77.670572
  },
  {
    "name": "Marcia Ellingson Garden",
    "lat": 43.083762,
    "long": -77.669907
  },
  {
    "name": "Kapp Delta Rho",
    "lat": 43.084326,
    "long": -77.669435
  },
  {
    "name": "Balance",
    "lat": 43.084514,
    "long": -77.668705
  },
  {
    "name": "Wetlands",
    "lat": 43.083339,
    "long": -77.666023
  },
  {
    "name": "9/11 Memorial",
    "lat": 43.084796,
    "long": -77.668018
  },
  {
    "name": "NRH Post Office",
    "lat": 43.084953,
    "long": -77.66701
  },
  {
    "name": "Echo Point",
    "lat": 43.085361,
    "long": -77.667675
  },
  {
    "name": "Whispering Wall",
    "lat": 43.08558,
    "long": -77.667525
  },
  {
    "name": "Bench of Legs",
    "lat": 43.086269,
    "long": -77.667825
  },
  {
    "name": "Concrete Tor",
    "lat": 43.086677,
    "long": -77.668447
  },
  {
    "name": "Split Cube",
    "lat": 43.086865,
    "long": -77.667739
  },
  {
    "name": "LBJ",
    "lat": 43.087607,
    "long": -77.667839
  },
  {
    "name": "Briggs Place",
    "lat": 43.087482,
    "long": -77.66892
  },
  {
    "name": "Orchid Tryptich",
    "lat": 43.087187,
    "long": -77.668618
  },
  {
    "name": "North Gate",
    "lat": 43.092005,
    "long": -77.674756
  },
  {
    "name": "RIT",
    "lat": 43.09235,
    "long": -77.666109
  },
  {
    "name": "Raddison",
    "lat": 43.0916,
    "long": -77.6636
  },
  {
    "name": "Park Point North",
    "lat": 43.092632,
    "long": -77.65907
  },
  {
    "name": "Park Point Clocktower",
    "lat": 43.091987,
    "long": -77.656611
  },
  {
    "name": "Barnes and Noble",
    "lat": 43.092007,
    "long": -77.655456
  },
  {
    "name": "Park Point East",
    "lat": 43.089842,
    "long": -77.655594
  },
  {
    "name": "Province",
    "lat": 43.086408,
    "long": -77.655773
  }
];

quests = [
  {
    "reward": "Unchecked",
    "quest": "???",
    "icon": "icon_unchecked"
  },
  {
    "reward": "Trash",
    "quest": "Berries/Balls/SD",
    "icon": "icon_trash"
  },
  {
    "reward": "1000+ SD",
    "quest": "Various",
    "icon": "icon_stardust"
  },
  {
    "reward": "3 Silver Pinaps",
    "quest": "Power Up Pokemon 10 Times",
    "icon": "icon_silver_pinap"
  },
  {
    "reward": "Golden Razz(s)",
    "quest": "Various",
    "icon": "icon_golden_razzberry"
  },
  {
    "reward": "Rare Candy",
    "quest": "Various",
    "icon": "icon_rare_candy"
  },
  {
    "reward": "Spinda #6",
    "quest": "Make a Great Curveball Throw",
    "icon": "icon_spinda"
  },
  {
    "reward": "Voltorb",
    "quest": "Make 5 Nice Throws",
    "icon": "icon_voltorb"
  },
  {
    "reward": "Gastly",
    "quest": "Make 3 Great Throws",
    "icon": "icon_gastly"
  },
  {
    "reward": "Onix",
    "quest": "Make 3 Great Throws in a row",
    "icon": "icon_onix"
  },
  {
    "reward": "Golduck",
    "quest": "Make 3 Curveball Throws in a row",
    "icon": "icon_golduck"
  },
  {
    "reward": "Larvitar",
    "quest": "Make 3 Excellent Throws in a row",
    "icon": "icon_larvitar"
  },
  {
    "reward": "Kanto Starter",
    "quest": "Win a Gym Battle",
    "icon": "icon_kanto_starter"
  },
  {
    "reward": "Jynx",
    "quest": "Win 3 Gym Battles",
    "icon": "icon_jynx"
  },
  {
    "reward": "Porygon",
    "quest": "Win a Raid",
    "icon": "icon_porygon"
  },
  {
    "reward": "Mankey",
    "quest": "Battle in a Gym",
    "icon": "icon_mankey"
  },
  {
    "reward": "Machop",
    "quest": "Battle in a Gym 5 times",
    "icon": "icon_machop"
  },
  {
    "reward": "Electabuzz",
    "quest": "User a supereffective Charged attack in 7 Gym battles",
    "icon": "icon_electrabuzz"
  },
  {
    "reward": "Eevee",
    "quest": "Evolve a Pokemon",
    "icon": "icon_eevee"
  },
  {
    "reward": "Feebas",
    "quest": "Trade a Pokemon",
    "icon": "icon_feebas"
  },
  {
    "reward": "Misdreavus",
    "quest": "Transfer 10 Pokemon",
    "icon": "icon_misdreavus"
  },
  {
    "reward": "Dratini",
    "quest": "Catch a Dragon-type Pokemon",
    "icon": "icon_dratini"
  },
  {
    "reward": "Numel",
    "quest": "Catch 3 Grass- Water- or Fire-type Pokemon",
    "icon": "icon_numel"
  },
  {
    "reward": "Vulpix/Poliwag",
    "quest": "Catch 5 Pokemon with Weather Boost",
    "icon": "icon_vulpix_poliwag"
  },
  {
    "reward": "Magikarp",
    "quest": "Catch 10 Pokemon",
    "icon": "icon_magikarp"
  },
  {
    "reward": "Exeggcute/Lanturn",
    "quest": "Hatch an Egg",
    "icon": "icon_exeggcute_lanturn"
  },
  {
    "reward": "Magmar",
    "quest": "Hatch 3 Eggs",
    "icon": "icon_magmar"
  },
  {
    "reward": "Chansey",
    "quest": "Hatch 5 Eggs",
    "icon": "icon_chansey"
  },
  {
    "reward": "Kanto Starter",
    "quest": "Power up Pokemon 5 Times",
    "icon": "icon_kanto_starter"
  }
];

createTables();

async function createTables(){
	await db.query("CREATE TABLE quest (id SERIAL PRIMARY KEY, reward VARCHAR(50), quest VARCHAR(100), icon VARCHAR(100))");
	await db.query("CREATE TABLE stop (id SERIAL PRIMARY KEY, name VARCHAR(50), loc POINT, quest_id INT DEFAULT 1, confirmed BOOLEAN DEFAULT FALSE, FOREIGN KEY (quest_id) REFERENCES quest(id))");
	await db.query("CREATE TABLE session (sid varchar NOT NULL COLLATE \"default\", sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE)");
	await db.query("ALTER TABLE session ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE");
	console.log("Tables Created");
	for(i in quests){
		await db.query("INSERT INTO quest (reward, quest, icon) VALUES ($1, $2, $3)", [quests[i]['reward'], quests[i]['quest'], quests[i]['icon']]);
	}
	console.log("Quests Imported");
	for(i in stops){
		await db.query("INSERT INTO stop (name, loc) VALUES ($1, point($2, $3))", [stops[i]['name'], stops[i]['lat'], stops[i]['long']]);
	}
	console.log("Stops Imported")
	process.exit();
}