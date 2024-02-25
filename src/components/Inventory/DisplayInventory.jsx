import React, {useState} from 'react'

//import pictures
import editPic from '../../assets/edit.png';
import deletePic from '../../assets/trash.png';
import savePic from '../../assets/save.png';
import undoPic from '../../assets/undo.png';
function DisplayInventory(props) {

    //destructured inventory
    const {inventory, fetchInventory} = props;

    //state
    const [editItem, setEditItem] = useState();
    const [editState, setEditState] = useState(0);

    // handler functions
    
    const deleteItem = async (id) => {

        try{
            //fetch request
            const resp = await fetch(`inventory/${id}`,{

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                    }
                }
            )
            fetchInventory();
            console.log(resp.status);
        }catch(err){
            console.log(err)
        }
        
    }

    const updateItem = async () => {

        try{
            const resp = await fetch(`/inventory/${editItem}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({quantity: editState})
            }
            );
            setEditItem(null);
            fetchInventory();
            console.log(resp.status)
        }catch(err){
            console.log(err)
        }

    }

    const inventoryRows = inventory.map( (el, index, arr) => {
        //return jsx
        if(el.size === editItem){// if this is the edit row
            //table row to be edited
            return(
                <tr key= {el.size}>
                <td>{el.size}</td>
                <td><input className= "table-input"type="number" value= {editState} onChange= {(e) => {setEditState(e.target.value)}}/></td>
                <td><img src={savePic} alt="save" className= "table-picture" onClick= {updateItem}/></td>
                <td><img src= {undoPic} alt="undo" className= "table-picture" onClick= { () => {
                    setEditItem(null);
                }}/></td>
            </tr>
            )
        }else{
            //regular table
            return (
            <tr key= {el.size}>
                <td>{el.size}</td>
                <td>{el.quantity}</td>
                <td>
                    <img src={editPic} alt="edit" className= "table-picture" onClick= { () => {
                        setEditItem(el.size);
                    }}/>
                </td>
                <td><img src= {deletePic} alt="delete" className= "table-picture" onClick={ () => {deleteItem(el.size)}}/></td>
            </tr>
        );
        }

        
    });

  return (
    <><div className= "table-container">
        <table id= "inventory-table">
            <thead>
                <tr>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Edit/Save</th>
                    <th>Delete/Undo</th>
                </tr>
            </thead>
            <tbody>
                {inventoryRows}
            </tbody>
        </table>
    </div>
        
    </>

    
  )
}

export default DisplayInventory;