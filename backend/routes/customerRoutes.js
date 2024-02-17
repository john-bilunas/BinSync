const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')


/*

******************Address API Documentation******************


GET One by id
    Route: http://localhost:3001/customer/id
    Input: Paramertized route, use customer id

    Output: Single customer object
        {
        "id": 2,
        "firstname": "Jane",
        "lastname": "Smith",
        "phone": "987-654-3210",
        "email": "jane.smith@example.com",
        "notes": "Dummy note for Jane"
        }


GET All
    Route: http://localhost:3001/customer
    Input: Nothing

    Output: Array of customer objects
    [
        {
            "id": 2,
            "firstname": "Jane",
            "lastname": "Smith",
            "phone": "987-654-3210",
            "email": "jane.smith@example.com",
            "notes": "Dummy note for Jane"
        },
        .....
    ]
    

POST Add one
    Route:http://localhost:3001/customer
    Input: Object with the following properties
        {
        "firstName": "Tim",
        "lastName": "P",
        "phone": "123-654-3210",
        "email": "Timmy@example.com",
        "notes": "Dummy note for Timothy"
        }
    Output: MESSAGE "Customer has successfully been created."
    

UPDATE By id -- no camel case for input
    Route:http://localhost:3001/customer/id
    Input:
        -Paramertized route, use customer id
        -Object with the properties you would like to update
        -If property is two words, do not use camel case, use all lowercase. Postgres returns queries in all lowercase, so this is needed for proper comparison. 

    Output:
    

DELETE By id - ensure that input is camelCase
    Route: http://localhost:3001/customer/id
    Input: Paramertized route, use customer id

    Output: MESSAGE "Customer has been successfully deleted."
    

*/

router.get('/',customerController.getAll, (req, res) => {

    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: 'Customers not found.'});
    }
});

router.get('/:id',customerController.getOne, (req, res) => {

    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: 'Customer not found.'});
    }
});

router.post('/', customerController.addOne, (req, res) => {

    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to add new customer.'});
    }
    
});
router.put('/:id', customerController.updateOne, (req, res) => {
    
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to update customer.'});
    }
});

router.delete('/:id', customerController.deleteOne, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to delete customer.'})
    }
});






module.exports = router;