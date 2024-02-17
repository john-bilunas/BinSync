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

addressController.getAllByCustId = async (req, res, next) => {

    //get all data from body/params
        //invoke model functionality with await
        //make sure you return 
        try{
            const {custId} = req.params;
            res.locals.data = await addressModel.getAllByCustId(custId);
            return next();
        }catch(err){
            err.controllerMessage = "Error getting addressed for customer in the address controller.";
            next(err);
        }
    
    }

addressController.addOne = async (req, res, next) => {
    
    try{
        const requiredProps = ["street","city","state","zip","customerId"];
        requiredProps.forEach( (el) => {
            if(!req.body.hasOwnProperty(el)){
                throw new Error("Missing a required property to create a new address.");
            }
        });
        const {street, city, state, zip, customerId} = req.body;
        // const notes = req.body.notes ? req.body.notes : null;
        res.locals.message = await addressModel.addOne(street, city, state, zip, customerId)//, notes);
        next();

    }catch(err){
        err.controllerMessage = "Error adding address from the controller.";
        next(err);
    }
}

addressController.updateOne = async (req, res, next) => {
    
    try{
        //number of properties is a variable
        const {id} = req.params;
        const {body} = req;
        body.id = id;
        res.locals.message = await addressModel.updateOne(body);
        next();


    }catch(err){
        err.controllerMessage = "Error updating address from the controller.";
        next(err);
    }
}

addressController.deleteOne = async (req, res, next) => {
    
    try{
        const {id} = req.params;
        res.locals.message = await addressModel.deleteOne(id);
        return next();


    }catch(err){
        err.controllerMessage = "Error deleting address from the controller.";
        next(err);
    }
}


module.exports = addressController;