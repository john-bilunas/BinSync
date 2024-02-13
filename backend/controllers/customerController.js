const customerModel = require('../models/customerModel');

const customerController = {};

//GET
customerController.getAll = async (req, res, next) => {

    try{
        //invoke model function, assigning values to res.locals
        res.locals.data = await customerModel.getAll();
        next();
    }catch(err){
        err.controllerMessage = "Error getting customers from the controller.";
        next(err)
    }

}
//GET single customer
customerController.getOne = async (req, res, next) => {

    try{
        //destructure variables needed
        const {id} = req.params;
        //invoke model function, assigning values to res.locals
        res.locals.data = await customerModel.getOne(id);
        next();
    }catch(err){
        err.controllerMessage = "Error getting customer from the controller.";
        next(err)
    }

}
//POST
customerController.addOne = async (req, res, next) => {

    try{

        //required properties to add customer to db
        const requiredProps = ["firstName","lastName","phone", "email"]; //notes are optional
        
        //check to make sure the required properties are in req.body
        requiredProps.forEach( (el) => {
            if(!req.body.hasOwnProperty(el)){//if property doesn't exist in req.body
                throw new Error(`"${el}" is required in order to add a new customer.`);
            } 
        });
        //destructure variables needed
        const {firstName, lastName, phone, email} = req.body
        let notes;
        if(req.body.notes === undefined){
            notes = null;
        }else{
            notes = req.body.notes;
        }
        //invoke model function, assigning values to res.locals
        res.locals.message = await customerModel.addOne(firstName, lastName, phone, email, notes);
        next();
    }catch(err){
        err.controllerMessage = "Error adding customer from the controller.";
        next(err)
    }

}
//PUT
customerController.updateOne = async (req, res, next) => {

    try{
        //destructure variables needed
        const {id} = req.params;
        if(!id) throw new Error("id is required in order to update a customer.");

        //invoke model function, assigning values to res.locals
        res.locals.message = await customerModel.updateOne(id, req.body);
        next();
    }catch(err){
        err.controllerMessage = "Error updating customer from the controller.";
        next(err)
    }

}
//DELETE
customerController.deleteOne = async (req, res, next) => {

    try{
        //destructure variables needed
        const {id} = req.params;
        if(!id) throw new Error("id is required in order to delete a customer.");
        //invoke model function, assigning values to res.locals
        res.locals.message = await customerModel.deleteOne(id);

        next();
    }catch(err){
        err.controllerMessage = "Error deleting customer from the controller.";
        next(err)
    }

}



module.exports = customerController;