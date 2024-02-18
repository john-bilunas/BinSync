import React from 'react';
import {useState, useEffect} from 'react';

function Inventory() {

    const [inventory, setInventory] = useState({});

    useEffect( () => {

        const fetchInventory = async () => {
            try {
              const response = await fetch('/inventory');
              const data = await response.json();
              setInventory(data);
            } catch (error) {
              console.error('Error fetching inventory:', error);
            }
          };
          
        fetchInventory();
        
    }, [])

    console.log(inventory)
    return (
    <main className = "">
        <h1>Inventory</h1>
        <form id= "add-inventory-form">
          <div className='inv-input-group'>
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div className='inv-input-group'>
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div className='inv-input-group'>
              <button>Add to Inventory</button>
            </div>
        </form>
    </main>
  )
}

export default Inventory;