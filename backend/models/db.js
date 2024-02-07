const {Pool} = require('pg');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({
    connectionString: connectionString,
    max: 10
})
console.log('Connection String:', connectionString);

module.exports = pool;