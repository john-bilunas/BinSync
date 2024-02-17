const express = require('express');
const router = express.Router(); // router object
const inventoryController = require('../controllers/inventoryController');

/*

******************Inventory API Documentation******************

--GET ALL Inventory items
    Route: http://localhost:3001/inventory
    Input: nothing
    Output: array of inventory items
        ex.)
            [{
                "size": 10,
                "quantity": 8
            },...
                ]
--GET SINGLE Inentory item
    Route: http://localhost:3001/inventory/id
    Input: id in params (see above)
    Output: Inventory object
            ex.)
            {
                "size": 10,
                "quantity": 8
            }
--POST Add item to inventory
        Route: http://localhost:3001/inventory
        Input: Object with properties of size, quantity
            {
                "size": 1234,
                "quantity": 17
            }
        Output: MESSAGE ->"Inventory item has been successfully added."
--PUT Update one inventory item
        Route: http://localhost:3001/inventory/size
        Input: Object with quantity property and opdated value. The "size" can be added to req.params
            {
                "quantity": 10
            }
        Output: MESSAGE ->"Inventory item has been succesfully updated."

--DELETE One inventory item

        Route: http://localhost:3001/inventory/size
        Input: Just size in params.
        Output: MESSAGE -> "Inventory item has been succesfully deleted."
*/

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
router.put('/:size',inventoryController.update, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: 'Unable to update inventory item.'});
    }
});
router.delete('/:size',inventoryController.delete, (req, res) => {
    if(res.locals.message){
        res.status(200).json({message: res.locals.message});
    }else{
        res.status(404).json({message: "Unable to delete inventory item."});
    }
});


module.exports = router;