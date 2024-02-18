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
              <label htmlFor="add-inv-size">Dumpster Size</label>
              <input id= "add-inv-size" type="text" />
            </div>
            <div className='inv-input-group'>
              <label htmlFor="add-inv-qty">Quantity</label>
              <input id= "add-inv-qty" type="text" />
            </div>
            <div className='inv-input-group'>
              <button>Add to Inventory</button>
            </div>
        </form>

        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
    </main>
  )
}

export default Inventory;