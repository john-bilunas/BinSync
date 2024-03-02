import React, {useState, useEffect} from 'react'
import closePic from '../assets/close.png'
function Modal(props) {

    const {modalCustomer, showModal, closeModal, fetchCustomers, modalEdit, setModalEdit} = props;
    // custId - the customer id of the customer to be rendered on the modal
    // showModal - boolean used in condition to set a class to show or hide the modal
    // closeModal - functionality to close the modal

    const [customerInfo, setCustomerInfo]= useState({});
    const [addressInfo, setAddressInfo] = useState([]);
    const [addressListItems, setAddressListItems] = useState(null);


    // fetch user information and their addresses
    
    const fetchUserAndAddresses = async (id) => {

        try{
            //get customer information
            const custResult = await fetch(`/customer/${id}`, {
                method: 'GET'
            });
            const custData = await custResult.json();
            setCustomerInfo(custData.data)
            const addressResult = await fetch(`/address/${id}`, {
                method: 'GET'
            });
            const addressData = await addressResult.json();
            setAddressInfo(addressData.data);
            
        }catch(err){   
            console.log(err);
        }
    }
    
    //when rendered, fetch customer info and address info
    useEffect( () => {
        fetchUserAndAddresses(modalCustomer.id);
    }, [modalCustomer.id]);

    //make addresses into a list of list items0

    useEffect( () => {

        if(addressInfo){
            const addresses = addressInfo.map( (el) => {

            return (<li>{`${el.street}, ${el.city}, ${el.state} ${el.zip}`}</li>)
        });
        setAddressListItems(addresses);
        }
        
    }, [addressInfo]);
    

    //--------------------------DELETE CUSTOMER---------------------
    const deleteCustomer = async () => {

        try{

            const result = await fetch(`/customer/${modalCustomer.id}`, {
                method: 'DELETE'
            });
            console.log(await result.json());
            
            //close modal
            closeModal();
            //need to show an error or success message OR refresh page
            fetchCustomers();
        }catch(err){
            console.log(err)
        }

    }

    //--------------------------EDIT CUSTOMER---------------------
    const [editedCustomerInfo, setEditedCustomerInfo] = useState({modalCustomer});
    
    //change the information in the editing boxes when the selected modal customer changes
    useEffect(() => {
        setEditedCustomerInfo(modalCustomer)
    },[modalCustomer]);
    //Used to update the state of the object being edited in the modal
    const updateCustomerState = (key, value) => {
        setEditedCustomerInfo( (prev) => {
            return {...prev, [key]:value}
        });
            
    }
    //send update request
    const updateCustomer = async () => {

        //send request
        try{

            let result = await fetch(`/customer/${editedCustomerInfo.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: editedCustomerInfo.firstname,
                    lastName: editedCustomerInfo.lastname,
                    phone: editedCustomerInfo.phone,
                    email: editedCustomerInfo.email,
                    notes: editedCustomerInfo.notes
                })
            }
            );
            const data = await result.json();
            console.log(data)
        }catch(err){
            console.log(err)
        }

        //fetch customers
    }
  return (
    <div className={showModal? 'center-container show-modal' : 'center-containe hide-modal'} id='modal-container'>
        <div  id= 'modal'>
            <img id= 'close-modal'src={closePic} alt="close" onClick= {closeModal}/>
            <h1>Customer Information</h1>
            {/* Much conditional logic to allow for editing */}
            <div id= 'modal-content'>
                
                 <p>{`${customerInfo?.firstname} ${customerInfo?.lastname}`}</p> 
                <p>{`${customerInfo?.phone}`}</p>
                <p>{`${customerInfo?.email}`}</p>
                <div className="customer-section">
                    <h2>Notes</h2>
                    <p >{`${customerInfo?.notes}`}</p>
                </div>
                {/* Conditional form for editing customer*/}
                
                <form className= {modalEdit ? 'visible' : 'hidden'}>
                <div className="block">
                        <label htmlFor="">First Name</label> 
                        <input type="text" value= {editedCustomerInfo.firstname}
                            onChange={ (e) => {
                                updateCustomerState("firstname", e.target.value);
                                
                            }}
                        />
                    </div>
                    <div className="block">
                        <label htmlFor="">Last Name</label> 
                        <input type="text" value= {editedCustomerInfo.lastname}
                        onChange={ (e) => {
                            updateCustomerState("lastname", e.target.value);
                            
                        }}/>
                    </div>
                    <div className="block">
                        <label htmlFor="">Phone Number</label> 
                        <input type="text" value= {editedCustomerInfo.phone}
                        onChange={ (e) => {
                            updateCustomerState("phone", e.target.value);
                            
                        }}/>
                    </div>
                    <div className="block">
                        <label htmlFor="">Email</label> 
                        <input type="text" value= {editedCustomerInfo.email}
                        onChange={ (e) => {
                            updateCustomerState("email", e.target.value);
                            
                        }}/>
                    </div>

                    <div className="column">
                        <label htmlFor="">Notes</label>
                        <textarea name="" id="" cols="20" rows="5" value= {editedCustomerInfo.notes}
                        onChange={ (e) => {
                            updateCustomerState("notes", e.target.value);
                            
                        }}></textarea>
                    </div>
                
                </form>

                <div className= 'side-by-side'>
                 {modalEdit ? 
                    <button onClick= { () => {
                        updateCustomer();
                        fetchCustomers();
                        setModalEdit(false);
                    }}>Save</button> :
                    <button onClick= { () => {setModalEdit(true)}}>Edit</button>
                }   
                
                
                    <button onClick= {deleteCustomer}>Delete</button>
                </div>
                <div className="customer-section">
                    <h2>Addresses</h2>
                    <ul id= 'address-list'>
                        {addressListItems}
                    </ul>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default Modal;