import React, {useState, useEffect} from 'react'
import closePic from '../assets/close.png'
function Modal(props) {

    const {custId, showModal, closeModal} = props;
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
        fetchUserAndAddresses(custId);
    }, [custId]);

    //make addresses into a list of list items0

    useEffect( () => {

        if(addressInfo){
            const addresses = addressInfo.map( (el) => {

            return (<li>{`${el.street}, ${el.city}, ${el.state} ${el.zip}`}</li>)
        });
        setAddressListItems(addresses);
        }
        
    }, [addressInfo]);
    




    console.log('customer info' ,customerInfo)
    console.log('address info' ,addressInfo)
    console.log('address items' ,addressListItems)

  return (
    <div className={showModal? 'center-container show-modal' : 'center-containe hide-modal'} id='modal-container'>
        <div  id= 'modal'>
            <img id= 'close-modal'src={closePic} alt="close" onClick= {closeModal}/>
            <h1>Customer Information</h1>
            <div id= 'modal-content'>
                <p>{`${customerInfo?.firstname} ${customerInfo?.lastname}`}</p>
                <p>{`${customerInfo?.phone}`}</p>
                <p>{`${customerInfo?.email}`}</p>
                <div className="customer-section">
                    <h2>Notes</h2>
                    <p >{`${customerInfo?.notes}`}</p>
                </div>
                <div className="customer-section">
                    <h2>Addresses</h2>
                    <ul>
                        {addressListItems}
                    </ul>
                </div>
                <div className= 'two-buttons'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default Modal;