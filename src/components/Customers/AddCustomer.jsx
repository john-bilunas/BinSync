import React, {useState} from 'react'


    
function AddCustomer() {
    
    //state to contain all of the customer information in one place. Using an object rather than separating into 5 different state variables
    const [addCustomer, setAddCustomer] = useState({
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        notes: null
    });
    //updates the state of the customer being added into the form. 
    const updateAddCustomer = (property, value) => {

        setAddCustomer( (prev) => {
            return {...prev, [property] : value}

        });
    }
    const addCustomerSubmission = async() => {

        try{
            const result = await fetch('customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addCustomer)
            });
            console.log(result)
        }catch(err){

        }
    }

  return (
    
    <div className='split-form'>
        <h2>Add Customer</h2>
        <div className= "center-container " >
                <form id= 'add-customer-form'>
                    <div className="start-container">
                        {/* first name */}
                        <label htmlFor="customer-first-name">First Name</label>
                        <input type="text" id= 'customer-first-name' autoComplete= 'off' value= {addCustomer.firstName} required
                            onChange= { (e) => {                               
                                updateAddCustomer('firstName', e.target.value);
                            }}
                        />
                        </div>
                        <div className="start-container">
                        {/* last name */}
                        <label htmlFor="customer-first-name">Last Name</label>
                        <input type="text" id= 'customer-first-name' autoComplete= 'off' value= {addCustomer.lastName} required 
                        onChange= { (e) => {                               
                            updateAddCustomer('lastName', e.target.value);
                        }}/>
                    </div>
                    <div className="start-container">
                        {/* phone number */}
                        <label htmlFor="customer-phone">Phone Number</label>
                        <input type="text"  id="customer-phone" autoComplete= 'off' value= {addCustomer.phone} required 
                        onChange= { (e) => {                               
                            updateAddCustomer('phone', e.target.value);
                        }}
                        />
                    </div>
                    <div className="start-container">
                        {/* email */}
                        <label htmlFor="customer-email">Email</label>
                        <input type="email" name="" id="customer-email" autoComplete= 'off' value= {addCustomer.email}  required 
                        onChange= { (e) => {                               
                            updateAddCustomer('email', e.target.value);
                        }}
                        />
                    </div>
                    <div className="start-container" style= { {"flexDirection": "column"}} >
                        {/* notes */}
                        <label htmlFor="customer-notes">Notes</label>
                        <textarea type="text-area" id="customer-notes" rows= "5" cols= "50" placeholder= "Enter any notes for this customer here:" value= {addCustomer.notes}
                        onChange= { (e) => {                               
                            updateAddCustomer('notes', e.target.value);
                        }}
                        />
                    </div>
                    <div className="center-container">
                       <button onClick= {addCustomerSubmission}>Add Customer</button> 
                    </div>
                    
                    
                </form>
            </div>
        </div>
  )
}

export default AddCustomer;