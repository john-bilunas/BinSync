const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')


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