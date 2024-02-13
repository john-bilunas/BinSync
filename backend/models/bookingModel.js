const pool = require('./db');

const bookingModel = {};

bookingModel.getAll = async () => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "SELECT * FROM Booking";
        const result = await client.query(queryText);
        return result.rows;
    }catch(err){
        err.modelMessage = "Error getting all booking in the model.";
        throw err;
    }finally{
        client.release();
    }

}

bookingModel.getOne = async (id) => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "SELECT * FROM Booking WHERE id = $1";
        const queryParams = [id];
        const result = await client.query(queryText, queryParams);
        return result.rows[0];

    }catch(err){
        err.modelMessage = "";
        throw err;
    }finally{
        client.release();
    }

}

bookingModel.addOne = async (customerId, addressId, inventoryId, dropoff, pickup, bookingStatus) => {

    let client;
    try{
        client = await pool.connect();
        const queryText = "INSERT INTO Booking (customerId, addressId, inventoryId, dropoff, pickup, bookingStatus) VALUES ($1,$2,$3,$4,$5,$6)";
        const queryParams = [customerId, addressId, inventoryId, dropoff, pickup, bookingStatus];
        await client.query(queryText, queryParams);
        return "A booking has successfully been created.";
    }catch(err){
        err.modelMessage = "Error creating a booking in the model.";
        throw err;
    }finally{
        client.release();
    }

}

bookingModel.updateOne = async (id, newInfo) => {

    let client;
    try{
        client = await pool.connect();
        const queryGetText = "SELECT * FROM Booking WHERE id = $1";
        const queryGetParams = [id];
        const getResults = await client.query(queryGetText, queryGetParams);
        const oldInfo = getResults.rows[0];
        const updatedInfo = Object.assign(oldInfo, newInfo);
        const {inventoryid, customerid, addressid,dropoff , pickup, bookingstatus} = updatedInfo;

        
        const queryText = "UPDATE Booking SET inventoryId = $1, customerId = $2, addressId = $3, dropoff = $4, pickup = $5, bookingStatus = $6 WHERE id = $7";
        const queryParams = [inventoryid, customerid, addressid,dropoff , pickup, bookingstatus, id];
        await client.query(queryText,queryParams);
        return "success";

    }catch(err){
        err.modelMessage = "Error updating booking in the model.";
        throw err;
    }finally{
        client.release();
    }

}

bookingModel.deleteOne = async (id) => {

    let client;
    try{
        client = await pool.connect();

        const queryText = "DELETE FROM Booking WHERE id = $1";
        const queryParams = [id];
        await client.query(queryText, queryParams);
        return "Successfully deleted booking."
    }catch(err){
        err.modelMessage = "Error deleting booking in model.";
        throw err;
    }finally{
        client.release();
    }

}













module.exports = bookingModel;