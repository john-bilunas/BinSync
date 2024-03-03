import React, {useState, useEffect} from 'react'
import AddBooking from './AddBooking';
import DisplayBookings from './DisplayBookings';
function Bookings() {

  //create a state object for booking that we are creating
  const [newBooking, setNewBooking] = useState({
    notes: "",
    bookingStatus: 'scheduled'
  });

  const updateNewBooking = ( key, value) => {

    setNewBooking( (prev) => {
      return {...prev, [key]: value}
    });
  };

  //create state for...
  //all customers
  const [customers, setCustomers] = useState([]);
  //all inventory
  const [inventory, setInventory] = useState([]);
  //customer address (for single selected customer)
  const [addresses,SetAddresses] = useState([])
  //all addresses
  const [allAddresses,SetAllAddresses] = useState([])
  //all bookings
  const [bookings, setBookings] = useState([]);
  
  //fetch ALL customers and set the customers state
  const fetchCustomers = async () => {
    try{
      let response = await fetch('/customer', {
      method: 'GET'
    });
    response = await response.json();
    setCustomers(response.data);
    }catch(err){
      console.log(err)
    }
  }

  //fetch ALL invetory and set the inventory state
  const fetchInventory = async () => {
    try{
      let response = await fetch('/inventory');
      response = await response.json();
      setInventory(response);
      return;
    }catch(err){
      console.log(err)
    }
  }
  //fetch ALL bookings and set the booking state
  const fetchBookings = async() => {
    try{
      let response = await fetch('/booking');
      response = await response.json();
      setBookings(response.data);
      return;
    }catch(err){
      console.log(err)
    }
  }
  //fetch ALL addresses and set the address state
  const fetchAllAddresses = async() => {
    try{
      let response = await fetch('/address');
      response = await response.json();
      SetAllAddresses(response.data);
      return;
    }catch(err){
      console.log(err)
    }
  }

  // fetchData invokes functions to fetch and update sll major states (customers, inventory, addresses, bookings)
  const fetchData = () => {
      fetchBookings();
      fetchCustomers();
      fetchInventory();
      fetchAllAddresses();
    }

  //Fetch all necessary data on the first render of the component
  useEffect( () => {
    fetchData();
  }, []);

  //create all of the options for the select element to choose a customer (for adding a booking)
  const customerOptions = customers.map( (el) => {

    return ( <option value= {el.id}>{`${el.firstname} ${el.lastname}`}</option>)
  });
    //create all of the options for the select element to choose a dumpster size (for adding a booking)
  const inventoryOptions = inventory.map( (el) => {

    return ( <option value= {el.size}>{`${el.size} yards`}</option>)
  });


  // fetchAddresses fetches all of the addresses for the selected customer (in AddBooking component)
  const fetchAddresses = async () => {
    if(newBooking.customerId){
      try{
        let response = await fetch(`/address/${newBooking.customerId}`);
        response = await response.json();
        SetAddresses(response.data);
        return;
      }catch(err){
        console.log(err)
      }
    }
    
  }
  // Any time that the customer is changed in the form to add a booking, the address list will be updated
  useEffect( () => {
      fetchAddresses();
  }, [newBooking.customerId]);

  // address options are the elements that are rendered in the select tag (in AddBooking)
  const [addressOptions, setAddressOptions] = useState([]);
  //Any time that the list of customer addresses change, the option elements will be updated for the select tag
  useEffect( () => {

    if(addresses){
      const customerAddresses = addresses.map( (el) => {

      return ( <option value= {el.id}>{`${el.street}, ${el.city}, ${el.state} ${el.zip}`}</option>)
    });
  setAddressOptions(customerAddresses) 
    }
  }, [addresses]);

  //Post request is sent to the API to add a booking the DB
  const postBooking= async (e) => {
    e.preventDefault();
    try{
      let response = await fetch(`booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
      });
      response = await response.json();
      console.log(response)
      fetchData();
    }catch(err){
      console.log(err)
    }
  }
  return (
    <main>
      <h1>Bookings</h1>
      <AddBooking customerOptions= {customerOptions} addressOptions= {addressOptions} inventoryOptions= {inventoryOptions}   newBooking= {newBooking} updateNewBooking= {updateNewBooking} postBooking= {postBooking}/>
      <DisplayBookings bookings= {bookings} addresses= {allAddresses} customers= {customers} inventory= {inventory} setBookings= {setBookings} fetchData= {fetchData}/>
    </main>
  )
}

export default Bookings;