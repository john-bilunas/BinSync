const pool = require('./db');

const addressModel = {};

addressModel.getAll = async () => {
    //input: id
    //outoput: address object

    let client;
    try{
        client = await pool.connect();
        const queryText = "SELECT * FROM Address";
        const result = await client.query(queryText);
        return result.rows;
    }catch(err){
        err.modelMessage = "Error getting addresses in the model.";
        throw err;
    }finally{
        client.release();
    }
}

addressModel.getAllByCustId = async (custId) => {
    //input: id
    //outoput: address object

    let client;
    try{
        client = await pool.connect();
        const queryText = "SELECT * FROM Address WHERE customerId = $1";
        const queryParams = [custId];
        const result = await client.query(queryText, queryParams);
        return result.rows;
    }catch(err){
        err.modelMessage = "Error getting addresses in the model.";
        throw err;
    }finally{
        client.release();
    }
}

addressModel.addOne = async (street, city, state, zip, customerId) => {
    //input: street, city, state, zip, customerId, notes
    //output: 
        //success: return success message
        //failure: throw err
    
        let client;
        try{
            client  = await pool.connect();
            const queryText = "INSERT INTO Address (street, city, state, zip, customerId) VALUES ($1,$2,$3,$4,$5)";
            const queryParams = [street, city, state, zip, customerId];
            await client.query(queryText, queryParams);
            return "Address has been successfully added.";
        }catch(err){
            err.modelMessage = "Error adding address in the model.";
            throw err;
        }finally{
            client.release();
        }
}

addressModel.updateOne = async (updatedInfo) => {

    let client;

    try{
        const {id} = updatedInfo;
        client = await pool.connect();
        //query the db for the current info
        const getQueryText = "SELECT * FROM Address WHERE id = $1";
        const getQueryParams = [id];
        const currentAddress = await client.query(getQueryText,getQueryParams);
        //Object.assign the new values
        const currentData = currentAddress.rows[0];
        const newData = Object.assign(currentData,updatedInfo);
        //make an update to the db for this particular address
        const {street, city, state, zip, customerid} = newData;
        const queryText = "UPDATE Address SET street = $1, city = $2, state = $3, zip = $4, customerId = $5 WHERE id = $6";
        const queryParams = [street, city, state, zip, customerid, id];
        await client.query(queryText,queryParams);
        return "Address has been successfully updated.";
    }catch(err){
        err.modelMessage = "There was an error updating the address in the model."
        throw err;
    }finally{
        client.release();
    }
    




}

addressModel.deleteOne = async (id) => {
    //input: id
    //output: 
        //success: return success message
        //failure: throw err
        let client;
        try{
            client  = await pool.connect();
            const queryText = "DELETE FROM Address WHERE id = $1";
            const queryParams = [id];
            await client.query(queryText, queryParams);
            return "Address has been successfully deleted.";
        }catch(err){
            err.modelMessage = "Error deleting address in the model.";
            throw err;
        }finally{
            client.release();
        }
}

module.exports = addressModel;