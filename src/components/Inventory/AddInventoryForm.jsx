import React, {useState, useEffect} from 'react'

function AddInventoryForm({inventory, fetchInventory}) {

    //state for keeping track of a violation in adding the same size/negative quantities
    const [addInvViolation, setAddInvViolation] = useState(false);
    const [qtyInvViolation, setQtyInvViolation] = useState(false);
    const [addMessage, setAddMessage] = useState('');
    //state for keeping track of the size and quantity in the form
    const [postData, setPostData] = useState({
        size : null,
        quantity: null
    });
    useEffect( () => {

        handleValidInvCheck(postData.size);
        handleValidQuantity(postData.quantity);

    },[postData])


    // Checks validity of size entered
    const handleValidInvCheck = (value) => {
      setAddInvViolation(false)
      inventory.forEach( (invEl) => {
        if(invEl.size === Number(value)){
          setAddInvViolation(true);
        }
      });
    }
    // Checks validity of quantity entered
    const handleValidQuantity = (value) => {
        //check to make sure that it is >= 0
        if(Number(value) < 0){
            setQtyInvViolation(true);
        }else{
            setQtyInvViolation(false);
        }
    }
    //This updates postData 
    const handlePostData = (prop, value) => {
        //update postData
        setPostData( (prev) => ({...prev, [prop]:value }));
        //run violation checks
    }

    //Send a fetch request to post the data if both input fields are valid
    const handleAddSumbission = async (e) => {

        e.preventDefault();



        //if postData is valid
        if(addInvViolation === false && qtyInvViolation === false && postData.size != null && postData.quantity != null ){

            try{
                //Make fetch request to add a new inventory Item
                const resp = await fetch('/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)

                })
                fetchInventory();
                setPostData({
                    size : null,
                    quantity: null
                })
                console.log(resp.status);
                setAddMessage('Successfully added to inventory!');
                //set success message
            }catch(err){
                //set failure message
                setAddMessage('Inventory addition unsuccesful.');
                console.log(err);
            }
            }
        }
  return (
    <>
        <form id= "add-inventory-form">
            <div className='inv-input-group'>
                <label htmlFor="add-inv-size" >Dumpster Size (in yards)</label>
                <input 
                id= "add-inv-size"className= { addInvViolation? 'red-background': '' }  type="number" autoComplete='off'
                onChange= { (e) => {
                    handlePostData("size", e.target.value);
                    }
                }/>
            </div>
            <div className='inv-input-group'>
                <label htmlFor="add-inv-qty">Quantity</label>
                <input id= "add-inv-qty" className= { qtyInvViolation? 'red-background' : ''}type="number"  autoComplete='off'
                onChange= { (e) => {
                    handlePostData("quantity", e.target.value);
                    }
                
                }/>
            </div>
            <div className='inv-input-group'>
                <button onClick= {handleAddSumbission}>Add to Inventory</button>
            </div>
        </form>
        <p id='add-inventory-message' className= {addMessage === 'Successfully added to inventory!'? 'success' : 'failure'}>{addMessage}</p>
    </>
    
  )
}

export default AddInventoryForm;