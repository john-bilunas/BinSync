const addressModel = require('../models/addressModel');

const addressController = {};

addressController.getOne = async (req, res, next) => {
    
    try{

        const {id} = req.body;
        res.locals.data = await addressModel.getOne(id);// returns data for that address
        next();
    }catch(err){
        err.controllerMessage = "Error getting address from the controller.";
        next(err);
    }
}

addressController.addOne = async (req, res, next) => {
    
    try{
        const {street, city, state, zip, customerId} = req.body;
        const notes = req.body.notes ? req.body.notes : null;
        res.locals.message = await addressModel.addOne(street, city, state, zip, customerId, notes);
        next();

    }catch(err){
        err.controllerMessage = "Error adding address from the controller.";
        next(err);
    }
}

addressController.updateOne = async (req, res, next) => {
    
    try{
        //number of properties is a variable
        const {body} = req;
        res.locals.message = await addressModel.updateOne(body);
        next();


    }catch(err){
        err.controllerMessage = "Error updating address from the controller.";
        next(err);
    }
}

addressController.deleteOne = async (req, res, next) => {
    
    try{
        const {id} = req.body;
        res.locals.message = await addressModel.deleteOne(id);
        return next();


    }catch(err){
        err.controllerMessage = "Error deleting address from the controller.";
        next(err);
    }
}


module.exports = addressController;