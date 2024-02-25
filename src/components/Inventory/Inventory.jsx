import React from 'react';
import {useState, useEffect} from 'react';
import DisplayInventory from './DisplayInventory';
import AddInventoryForm from './AddInventoryForm';



function Inventory() {

  const [inventory, setInventory] = useState([]);
  

  const fetchInventory = async () => {
    try {
      const response = await fetch('/inventory');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  //get all inventory
    useEffect( () => {
          
        fetchInventory();
        
    }, [])



    // console.log( typeof inventory)
    return (
    <main className = "">
        <h1>Inventory</h1>
      <AddInventoryForm inventory= {inventory} fetchInventory= {fetchInventory}/>
      <DisplayInventory inventory={inventory} fetchInventory= {fetchInventory}/>


    </main>
  )
}

export default Inventory;