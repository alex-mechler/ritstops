require('dotenv').config();

const db = require('./api/util/db.js');

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
    "reward": "Rare Candy",
    "quest": "Various",
    "icon": "icon_rare_candy"
  },
  {
    "reward": "Golden Razz Berry",
    "quest": "Various",
    "icon": "icon_golden_razzberry"
  },
  {
    "reward": "5 Silver Pinaps",
    "quest": "Catch 3 Grass Water or Fire-type Pokemon / Spin 10 Pokestops or Gyms",
    "icon": "icon_silver_pinap"
  },
  {
    "reward": "Cubone",
    "quest": "Use 5 Razz Berries to Help Catch Pokemon",
    "icon": "icon_cubone"
  },
  {
    "reward": "Anorith",
    "quest": "Catch 7 Flying",
    "icon": "Psychic"
  },
  {
    "reward": "Starmie",
    "quest": "Catch 5 Electric",
    "icon": "Normal"
  },
  {
    "reward": "Kabuto",
    "quest": "Catch 10 Ice-type Pokemon",
    "icon": "icon_kabuto"
  },
  {
    "reward": "Sandshrew",
    "quest": "Catch 10 Ground-type Pokemon",
    "icon": "icon_sandshrew"
  },
  {
    "reward": "Magnemite",
    "quest": "Catch 5 Fighting-type Pokemon",
    "icon": "icon_magnemite"
  },
  {
    "reward": "Magikarp",
    "quest": "Use 10 Pinap Berries While Catching Pokemon",
    "icon": "icon_magikarp"
  },
  {
    "reward": "Magikarp / Houndour",
    "quest": "Catch 10 Pokemon",
    "icon": "icon_grass"
  },
  {
    "reward": "Poliwag / Vulpix",
    "quest": "Catch 5 Pokemon with Weather Boost",
    "icon": "icon_grass"
  },
  {
    "reward": "Dratini",
    "quest": "Catch a Dragon-type Pokemon",
    "icon": "icon_dratini"
  },
  {
    "reward": "Growlithe",
    "quest": "Use 5 Berries to Help Catch Pokemon",
    "icon": "icon_growlithe"
  },
  {
    "reward": "Aerodactyl",
    "quest": "Use an Item to Evolve a Pokemon",
    "icon": "icon_aerodactyl"
  },
  {
    "reward": "Eevee / Sunkern",
    "quest": "Evolve a Pokemon",
    "icon": "icon_grass"
  },
  {
    "reward": "Kanto Starter",
    "quest": "Power Up a Pokemon 5 Times",
    "icon": "icon_grass"
  },
  {
    "reward": "Vulpix",
    "quest": "Transfer 3 Pokemon",
    "icon": "icon_vulpix"
  },
  {
    "reward": "Manetric",
    "quest": "Trade a Pokemon",
    "icon": "icon_manetric"
  },
  {
    "reward": "Tentacruel",
    "quest": "Earn 5 Candies Walking with Your Buddy",
    "icon": "icon_tentacruel"
  },
  {
    "reward": "Gastly",
    "quest": "Send 2 Gifts to Friends",
    "icon": "icon_gastly"
  },
  {
    "reward": "Exeggcute / Snubbull",
    "quest": "Hatch an Egg",
    "icon": "icon_grass"
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
    "reward": "Aerodactyl",
    "quest": "Win 5 Raids",
    "icon": "icon_aerodactyl"
  },
  {
    "reward": "Lapras",
    "quest": "Win 5 Gym Battles",
    "icon": "icon_lapras"
  },
  {
    "reward": "Mankey / Machop",
    "quest": "Battle in a Gym",
    "icon": "icon_mankey"
  },
  {
    "reward": "Machop",
    "quest": "Battle in a Gym 5 Times",
    "icon": "icon_machop"
  },
  {
    "reward": "Kanto Starter",
    "quest": "Win a Gym Battle",
    "icon": "icon_grass"
  },
  {
    "reward": "Electabuzz",
    "quest": "User a Super Effective Charged Attack in a Gym Battle 7 Times",
    "icon": "icon_electrabuzz"
  },
  {
    "reward": "Jynx",
    "quest": "Win 3 Gym Battles",
    "icon": "icon_jynx"
  },
  {
    "reward": "Drowzee",
    "quest": "Battle in a Raid",
    "icon": "icon_drowzee"
  },
  {
    "reward": "Omanyte / Kabuto",
    "quest": "Win a Level 3 or Higher Raid",
    "icon": "icon_grass"
  },
  {
    "reward": "Gastly / Lileep / Anorith",
    "quest": "Make 3 Great Throws",
    "icon": "icon_grass"
  },
  {
    "reward": "Spinda",
    "quest": "Make 5 Great Curveball Throws in a Row",
    "icon": "icon_spinda"
  },
  {
    "reward": "Bidoof",
    "quest": "Make 5 Nice Throws",
    "icon": "icon_bidoof"
  },
  {
    "reward": "Onix",
    "quest": "Make 3 Great Throws in a Row",
    "icon": "icon_onix"
  },
  {
    "reward": "Larvitar",
    "quest": "Make 3 Excellent Throws in a Row",
    "icon": "icon_larvitar"
  }
];

updateQuests();

async function updateQuests(){
  await db.query("DELETE FROM quest");
	await db.query("CREATE TABLE quest (id SERIAL PRIMARY KEY, reward VARCHAR(50), quest VARCHAR(100), icon VARCHAR(100))");
	for(i in quests){
		await db.query("INSERT INTO quest (reward, quest, icon) VALUES ($1, $2, $3)", [quests[i]['reward'], quests[i]['quest'], quests[i]['icon']]);
	}
	process.exit();
}