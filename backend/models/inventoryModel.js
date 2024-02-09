const pool = require('./db');

const inventoryModel = {};


//Queries database for all inventory items
inventoryModel.getInventory = async () => {
    let client;
    try{
        //connect to the pool
        client = await pool.connect();
        //query for all inventory items
        const result = await client.query('SELECT * FROM Inventory;');
        console.log("rows",result.rows);
        return result.rows;
    }catch(err){
            err.modelMessage = "Error getting all inventory items from inventory model."
            console.error(err);
            //ensure an error is thrown in the controller invoking this
            throw err;
    }finally{
        client.release();
    }

}
inventoryModel.getItemFromInventory = async (id) => {

    let client;

    try{
        //connect to pool
        client = await pool.connect();
        //create variables for paramaterized query
        const queryText = 'SELECT * FROM Inventory WHERE size = $1';
        const queryParams = [id];
        //run query
        const result = await client.query(queryText, queryParams);
        console.log("single inventory item", result.rows)
        return result.rows;
    }catch(err){
        err.modelMessage = "Error running query for single inventory item";
        console.error(err);
        //ensure an error is thrown in the controller invoking this
        throw err;
    }finally{
        client.release();
    }
}

inventoryModel.postOne = async (size, quantity) => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "INSERT INTO Inventory (size, quantity) VALUES ($1, $2)";
        const queryParams = [size, quantity];
        await client.query(queryText, queryParams);
        return "Inventory item has been successfully added.";

    }catch(err){
        err.modelMessage = "Error inserting new inventory item in model."
        throw err;
    }finally{
        client.release();
    }

}
inventoryModel.update = async (size, quantity) => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "UPDATE Inventory SET quantity = $2 WHERE size = $1";
        const queryParams = [size, quantity];
        await client.query(queryText, queryParams);
        return "Inventory item has been succesfully updated."

    }catch(err){
        err.modelMessage = "Error updating inventory item in model.";
        throw err;
    }finally{
        client.release();
    }
}

inventoryModel.delete = async (size) => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "DELETE FROM Inventory WHERE size = $1";
        const queryParams = [size];
        client.query(queryText, queryParams)
        return "Inventory item has been succesfully deleted."
    }catch(err){
        err.modelMessage = "Error deleting inventory in model.";
        throw err;
    }finally{
        client.release();
    }
}
module.exports = inventoryModel;

