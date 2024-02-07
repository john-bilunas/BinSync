
const inventoryModel = require('../models/inventoryModel');
const inventoryController = {};


inventoryController.verifyInput = async (req, res, next) => {



}

inventoryController.getAllInventory = async (req, res, next) => {

    try{
        const inventoryObj = await inventoryModel.getInventory();
        res.locals.inventory = inventoryObj;
        return next();
    }
    catch(err){
        err.myErrorMessage = "Error getting all of the inventory items in the controller.";
        return next(err);
    }
}




inventoryController.getItemFromInventory = async (req, res, next) => {
    try{
        //get id from params
        const inventoryId = req.params.id;
        //make query
        const inventoryItem = await inventoryModel.getItemFromInventory(inventoryId);
        //save returned item to res.locals
        res.locals.inventoryItem = inventoryItem;
        //move on to next step
        return next();
    }
    catch(err){
        //custom error message to add to error object
        err.myErrorMessage = "Error getting one inventory item in the controller.";
        //invoke global error handler with error object
        return next(err);
    }
}


//GET
//get all inventory
//get one inventory

//POST
//add one inventory
//add many inventory? or can they be the same
//veryify inpu 

// inventoryModel.getInventory

module.exports = inventoryController;

