import React,{useState} from 'react'
import CustomerOptions from './CustomerOptions';

function AddAddress(props) {

    //state to hold data to add a new address
    const [addAddress, setAddAddress] = useState({
        street: null,
        city: null,
        state: null,
        zip: null,
        customerId: null
    });
    //used to update state object
    const updateAddAddress = (property, value) => {
        setAddAddress( (prev) => {
            return {
                ...prev, [property]: value
            }
        });
    }
    //Functionality to add new address
    const addNewAddress = async () => {
        try{
            const result = await fetch('/address',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addAddress)
            });
            console.log(result)
        }catch(err){
            console.log(err)
        }
        
    }

    const {customers} = props;
    //create customer options for select tag
    const customerOptions = customers.map( (cust) => {
        return <CustomerOptions name= {`${cust.firstname} ${cust.lastname}`} id= {cust.id} updateAddAddress={updateAddAddress}/>
    });


    console.log("Add Address", addAddress)
    return (
    <>
    <h2>Add an Address</h2>
        <div className="center-container">
            <form id= 'add-address-form'>
                <div className="center-container">
                   {/* <label htmlFor="choose-customer">Select a Customer</label> */}
                   <select  id="choose-customer" value= {addAddress.customerId} required
                   onChange= { (e) => {
                        updateAddAddress("customerId", e.target.value);
                   }}>
                    <option value="">Select a Customer</option>
                    {customerOptions}
                   </select>
                </div>
                {/* street */}
                <div className="center-container">
                    <label htmlFor="street">Street</label>
                    <input type="text" id= "street" autoComplete='off' value= {addAddress.street} required
                    onChange= { (e) => {
                        updateAddAddress("street", e.target.value);
                   }}/>
                </div>
                {/*  city */}
                <div className="center-container">
                    <label htmlFor="city">City</label>
                    <input type="text" id= "city" autoComplete='off' value= {addAddress.city} required
                    onChange= { (e) => {
                        updateAddAddress("city", e.target.value);
                   }}/>
                </div>
                {/*  state */}
                <div className="center-container">
                    <label htmlFor="states">State</label>
                    <select id="states" value= {addAddress.state} required
                    onChange= { (e) => {
                        updateAddAddress("state", e.target.value);
                   }}>
                        <option value="">Select a State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                {/*  zip */}
                <div className="center-container">
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" id= "zip" autoComplete='off' value= {addAddress.zip} required
                    onChange= { (e) => {
                        updateAddAddress("zip", e.target.value);
                   }}/>
                </div>
                <div className="center-container">
                    <button onClick= {addNewAddress}>Add Address</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default AddAddress;