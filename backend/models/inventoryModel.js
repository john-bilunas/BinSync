const pool = require('./db');

const inventoryModel = {};


inventoryModel.getInventory = async () => {

    const client = await pool.connect();

    try{
        const result = await client.query('SELECT * FROM Inventory;');
        console.log("rows",result.rows);
        return result.rows;
    }catch(err){
         console.log(`There was a problem with executing the query. ${err}`)
    }finally{
        client.release();
    }

}
inventoryModel.getOne = async (id) => {
    //input: id from inventory table
    const client = await pool.connect();
    console.log(`Getting item number ${id} from inventory for you!`)
    try{
        const result = await client.query('SELECT * FROM Inventory;');
        console.log("rows",result.rows);
        return result.rows;
    }catch(err){
         console.log(`There was a problem with executing the query. ${err}`)
    }finally{
        client.release();
    }

}


module.exports = inventoryModel;

