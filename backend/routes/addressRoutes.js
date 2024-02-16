const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

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



