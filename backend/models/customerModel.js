const pool = require('./db');

const customerModel = {};

customerModel.getAll = async () => {
    //in: nothing
    //out: an array of all customer objects
    let client;
    try{
        
        client = await pool.connect();
        const queryText = "SELECT * FROM Customers";
        //query ...remember .rows
        console.log("hello")
        const result = await client.query(queryText);
        console.log(result.rows);
        return result.rows;

    }catch(err){
        err.modelMessage = "Error getting customers in the model.";
        throw err;
    }finally{
        client.release();
    }

}

customerModel.getOne = async (id) => {
    //in:
    //out:
    let client;
    try{
        client = await pool.connect();
        //query
        const queryText = "SELECT * FROM Customers WHERE id = $1";
        const queryParams = [id];
        const result = await client.query(queryText, queryParams);
        return result.rows[0];

    }catch(err){
        err.modelMessage = "Error getting customer in the model.";
        throw err;
    }finally{
        client.release();
    }

}

customerModel.addOne = async (firstName, lastName, phone, email, notes) => {
    //in:
    //out:
    let client;
    try{
        client = await pool.connect();
        //query
        const queryText = "INSERT INTO Customers (firstName, lastName, phone, email, notes) VALUES ($1,$2,$3,$4,$5)";
        const queryParams = [firstName, lastName, phone, email, notes];
        await client.query(queryText, queryParams);
        return "Customer has successfully been created."

    }catch(err){
        err.modelMessage = "Error creating customer in the model.";
        throw err;
    }finally{
        client.release();
    }

}

customerModel.updateOne = async (id, newInfo) => {
    //in:
    //out:
    let client;
    try{
        client = await pool.connect();

        //get the current info from the db
        const queryGetText = "Select * FROM Customers WHERE id = $1";
        const queryGetParams = [id];
        const oldInfo = await client.query(queryGetText, queryGetParams);
        //object. assign with newInfo
        console.log("hi");
        const updatedInfo = Object.assign(oldInfo.rows[0], newInfo);
        console.log("Updated", updatedInfo)
        //query to update with all values in new object
  
        const {firstname, lastname, phone, email, notes} = updatedInfo;
        const queryText = "UPDATE Customers SET firstName = $1, lastName = $2, phone = $3, email = $4, notes = $5 WHERE id = $6 ";
        const queryParams = [firstname, lastname, phone, email, notes, id];
        await client.query(queryText, queryParams);
        return "Customer has sucessfully been updated.";
    }catch(err){
        err.modelMessage = "Error updating customer in the model.";
        throw err;
    }finally{
        client.release();
    }

}

customerModel.deleteOne = async (id) => {
    //in:
    //out:
    let client;
    try{
        client = await pool.connect();
        const queryText = "DELETE FROM Customers WHERE id = $1";
        const queryParams = [id];
        await client.query(queryText, queryParams);
        return "Customer has been successfully deleted."
        //query ...remember .rows

    }catch(err){
        err.modelMessage = "Error _ customer in the model.";
        throw err;
    }finally{
        client.release();
    }

}








module.exports = customerModel;