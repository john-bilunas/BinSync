const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
//GET All
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