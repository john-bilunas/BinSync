// const pool = require('./db');


// async function testDB(){

//     const client = await pool.connect();

//     try{
//         const result = await client.query('SELECT * FROM customers;');
//         console.log(result.rows);
//     //     const result = await client.query('SELECT NOW() as current_time');
//     // console.log('Result:', result.rows[0].current_time);
//     }catch(err){
//          console.log(`There was a problem with executing the query. ${err}`)
//     }finally{
//         client.release();
//     }

// }

// module.exports = testDB;
