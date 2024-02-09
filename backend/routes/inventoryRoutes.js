const express = require('express');
const router = express.Router(); // router object
const inventoryController = require('../controllers/inventoryController');

//Get request for a single inventory item
router.get('/:id', inventoryController.getOne, (req, res) => {

    if (res.locals.inventoryItem) {
        res.json(res.locals.inventoryItem); //response contains inventory item
    } else {
        res.status(404).json({ error: 'Item not found in inventory.' });
    }
});

//Get request for all of the inventory items
router.get('/', inventoryController.getAllInventory, (req, res) => {

    if (res.locals.inventory) {
        res.json(res.locals.inventory);
    } else {
        res.status(404).json({ error: 'Inventory not found.' });
    }
});
//another get with an id?


router.post('/', inventoryController.postOne, (req, res) => {
    //incoming request should have this format: { size: __, quantity: __}
    if(res.locals.message){
        res.status(200).json({ message: res.locals.message });
    }else{
        res.status(404).json({ message: 'Unable to add inventory.' });
    }
});
router.put('/',inventoryController.update, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to update inventory item.'});
    }
});
router.delete('/',inventoryController.delete, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: "Unable to delete inventory item."});
    }
});


module.exports = router;