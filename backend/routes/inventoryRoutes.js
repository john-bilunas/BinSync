const express = require('express');
const router = express.Router(); // router object
const inventoryController = require('../controllers/inventoryController');


router.get('/:id', inventoryController.getOne, (req, res) => {

    if (res.locals.inventoryItem) {
        res.json(res.locals.inventoryItem); //response contains inventory item
    } else {
        res.status(404).json({ error: 'Item not found in inventory.' });
    }
});

router.get('/', inventoryController.getAllInventory, (req, res) => {

    if (res.locals.inventory) {
        res.json(res.locals.inventory);
    } else {
        res.status(404).json({ error: 'Inventory not found.' });
    }
});
//another get with an id?


router.post('/', (req, res) => {
    
});
router.put('/', (req, res) => {
    
});
router.delete('/', (req, res) => {
    
});


module.exports = router;