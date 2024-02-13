const bookingModel = require('../models/bookingModel');


const bookingController = {};

bookingController.getAll = async (req, res, next) => {

    //get all data from body/params
    //invoke model functionality with await
    //make sure you return 
    try{
        
        res.locals.data = await bookingModel.getAll();
        next();
    }catch(err){
        err.controllerMessage = "Error getting all of the bookings in the controller.";
        next(err);
    }

}

bookingController.getOne = async (req, res, next) => {

//get all data from body/params
    //invoke model functionality with await
    //make sure you return 
    try{
        const {id} = req.params;
        res.locals.data = await bookingModel.getOne(id);
        return next();
    }catch(err){
        err.controllerMessage = "Error getting a booking in the controller.";
        next(err);
    }

}

bookingController.addOne = async (req, res, next) => {

//get all data from body/params
    //invoke model functionality with await
    //make sure you return 
    try{
        //required properties
        const requiredProps = ["customerId", "addressId", "inventoryId", "dropoff", "pickup", "bookingStatus"];
        
        requiredProps.forEach( (el) => {
            if(!req.body.hasOwnProperty(el)){
                throw new Error("Missing a required property to create a new booking.");
            }
        });
        
        const {customerId, addressId, inventoryId, dropoff, pickup, bookingStatus} = req.body;
        
        res.locals.message = await bookingModel.addOne(customerId, addressId, inventoryId, dropoff, pickup, bookingStatus);
        return next();
    }catch(err){
        err.controllerMessage = "Error creating a booking in the controller.";
        next(err);
    }

}

bookingController.updateOne = async (req, res, next) => {
//get all data from body/params
    //invoke model functionality with await
    //make sure you return 
    try{
        const {id} = req.params;
        console.log(id)
        if(!id) throw new Error("id is required in order to update a booking.");
        res.locals.message = await bookingModel.updateOne(id, req.body);
        return next();
    }catch(err){
        err.controllerMessage = "Error updating a booking in the controller.";
        next(err);
    }

}

bookingController.deleteOne = async (req, res, next) => {
//get all data from body/params
    //invoke model functionality with await
    //make sure you return 
    try{
        const {id} = req.params;
        res.locals.message = await bookingModel.deleteOne(id);
        return next();
    }catch(err){
        err.controllerMessage = "Error deleting a booking in the controller.";
        next(err);
    }

}












module.exports = bookingController;






