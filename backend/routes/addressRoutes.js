const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

/*

******************Address API Documentation******************

GET One by address id


    Route: http://localhost:3001/address
    Input:
        {
            "id" : 10
        }
    Output:
    {
        "id": 6,
        "street": "123 Fake Street",
        "city": "Whitman",
        "state": "MA",
        "zip": "02382",
        "customerid": 4
    }

GET All by customer id

    Route: http://localhost:3001/address/custId
    Input: customer id in req.params
    Output:array of address objects that are associated with certain customer
        [
        {
            "id": 5,
            "street": "125 Fake Street",
            "city": "Whitman",
            "state": "MA",
            "zip": "02382",
            "customerid": 6
        },
        {
            "id": 7,
            "street": "125 Fake Street",
            "city": "Whitman",
            "state": "NY",
            "zip": "02382",
            "customerid": 6
        }
    ]

POST Add One

    Route:http://localhost:3001/address
    Input:
    {

        "street": "1234 Fake Street",
        "city": "Whitmann",
        "state": "MA",
        "zip": "02382",
        "customerId": 6 /////////////////////////////////////////////"I" Camel case must be used here 
    }
    Output: MESSAGE "Address has been successfully added."

OUT Update one by id

    Route:http://localhost:3001/address/id
    Input:
{
        "street": "1234 Fake Street1",
        "city": "Whitmann1",
        "state": "NY",
        "zip": "023824",
        "customerid": 5             //////////// DO NOT USE Camel case for this. Postgres does not return camel case, so comparisons won't be made properly
    }

    Output: MESSAGE "Address has been successfully updated."

DELETE One

    Route:http://localhost:3001/address/id
    Input: id in req.params
    Output: MESSAGE "Address has been successfully deleted."

*/

router.get('/',addressController.getOne, (req, res) => {

    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: 'Address not found'});
    }
});
router.get('/:custId',addressController.getAllByCustId, (req, res) => {

    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: 'Addresses not found'});
    }
});

router.post('/', addressController.addOne, (req, res) => {

    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to add new address.'});
    }
    
});
router.put('/:id', addressController.updateOne, (req, res) => {
    
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to update address.'});
    }
});

router.delete('/:id', addressController.deleteOne, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to delete address.'})
    }
});

module.exports = router;



