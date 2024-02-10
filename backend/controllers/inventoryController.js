
const inventoryModel = require('../models/inventoryModel');

//Inventory controller object
//This will contain middleware functions that communicate with the models
const inventoryController = {};


inventoryController.verifyInput = async (req, res, next) => {



}
//////////////////////////////////////GET///////////////////////////////////////////

//Get all inventory
inventoryController.getAllInventory = async (req, res, next) => {

    try{
        const inventoryObj = await inventoryModel.getInventory();
        res.locals.inventory = inventoryObj;
        return next();
    }
    catch(err){
        err.controllerMessage = "Error getting all of the inventory items in the controller.";
        return next(err);
    }
}

//Get one inventory item
inventoryController.getOne = async (req, res, next) => {
    try{
        //get id from params
        const inventoryId = req.params.id;
        //make query
        const inventoryItem = await inventoryModel.getItemFromInventory(inventoryId);
        //save returned item to res.locals
        res.locals.inventoryItem = inventoryItem[0];
        //move on to next step
        return next();
    }
    catch(err){
        //custom error message to add to error object
        err.controllerMessage = "Error getting one inventory item in the controller.";
        //invoke global error handler with error object
        return next(err);
    }
}

inventoryController.postOne = async (req, res, next) => {
    try{
        const {size, quantity} = req.body;
        //Invoke model function to insert new inventory item into the db
        res.locals.message = await inventoryModel.postOne(size, quantity);
        next();
    }catch(err){
        err.controllerMessage = "Error adding one inventory item in the controller.";
        return next(err)
    }
}

inventoryController.update = async (req, res, next) => {

    try{
        //get size and quantity from the body of request object
        const {size, quantity} = req.body;
        res.locals.message = await inventoryModel.update(size, quantity);
        return next();
    }catch(err){
        err.controllerMessage = "Error updating inventory item in the controller.";
        return next(err);
    }
}

inventoryController.delete = async (req, res, next) => {

    try{
        const {size} = req.body;
        res.locals.message = await inventoryModel.delete(size);
        return next();
    }catch(err){
        err.controllerMessage = "Error deleting inventory item in the controller.";
        return next(err);
    }



}


//POST
//add one inventory
//add many inventory? or can they be the same
//veryify inpu 

// inventoryModel.getInventory

module.exports = inventoryController;

