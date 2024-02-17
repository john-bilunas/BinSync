const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


/*

******************Address API Documentation******************

GET All

    Route: http://localhost:3001/booking
    Input: Nothing


    Output: Array of all booking objects
    [
        {
            "id": 4,
            "customerid": 2,
            "addressid": 2,
            "dropoff": "2024-03-05T05:00:00.000Z",
            "pickup": "2024-03-10T05:00:00.000Z",
            "bookingstatus": "inprocess",
            "inventoryid": 15,
            "notes": "notes"
        },
        ......
    ]


GET One by id

    Route: http://localhost:3001/booking/id
    Input: Parameterized route with booking id


    Output: Single booking object
        {
            "id": 4,
            "customerid": 2,
            "addressid": 2,
            "dropoff": "2024-03-05T05:00:00.000Z",
            "pickup": "2024-03-10T05:00:00.000Z",
            "bookingstatus": "inprocess",
            "inventoryid": 15,
            "notes": "notes"
        }
    

POST Add One

    Route: http://localhost:3001/booking
    Input: Object with the following properties: 
        {
            "customerId": 2,
            "addressId": 8,
            "dropoff": "2024-02-05T05:00:00.000Z",
            "pickup": "2024-02-10T05:00:00.000Z",
            "bookingStatus": "completed",
            "inventoryId": 325,
            "notes": "notes have been updated."
        }
        ....Please make sure to make properties camel case when necessary to ensure that they will be added to the database.


    Output: MESSAGE "A booking has successfully been created."

    

PUT Update one by id

    Route: http://localhost:3001/booking/id
    Input: 
        -Parameterized route with id 
        -Object of updated properties
        {
            "customerid": 7,
            "addressid": 8,
            "dropoff": "2024-02-05",
            "pickup": "2024-02-10",
            "bookingstatus": "complete",
            "inventoryid": 325,
            "notes": "notes have been updated."
        }

    Output: MESSAGE "Success"

    

DELETE One by id

    Route: http://localhost:3001/booking/id
    Input: Parameterized route with booking id


    Output: "Successfully deleted booking."

    
















*/

router.get('/' ,bookingController.getAll, async (req, res) => {

    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: "Bookings not found."});;
    }
    
});

router.get('/:id' ,bookingController.getOne , async (req, res) => {
    
    if(res.locals.data){
        res.status(200).json({data: res.locals.data});
    }else{
        res.status(404).json({message: "Booking not found."});;
    }
    
});

router.post('/' ,bookingController.addOne , async (req, res) => {
    
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to create new booking.'});
    }
    
});

router.put('/:id' ,bookingController.updateOne ,  (req, res) => {
    
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to update booking.'});
    }
    
});

router.delete('/:id' ,bookingController.deleteOne , (req, res) => {

    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to delete booking.'});
    }
    
});

module.exports = router;