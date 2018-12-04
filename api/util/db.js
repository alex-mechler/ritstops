const {Pool} = require('pg');

const pool = new Pool({
	host: 'localhost',
	password: '12345678',
	user: 'postgres',
	database: 'ritstop'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = {
	query: (text, params) => pool.query(text, params)
}