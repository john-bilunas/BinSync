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
  }

  //create state for all customers and inventory
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [addresses,SetAddresses] = useState([])
  const [allAddresses,SetAllAddresses] = useState([])
  const [bookings, setBookings] = useState([]);
  
  //fetch customers
  const fetchCustomers = async () => {

    try{
      let response = await fetch('/customer', {
      method: 'GET'
    });
    response = await response.json();
    // console.log(response)
    setCustomers(response.data);
    }catch(err){
      console.log(err)
    }
    
  }
  //fetch inventory
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

  const fetchData = () => {
      fetchBookings();
      fetchCustomers();
      fetchInventory();
      fetchAllAddresses();
    }

  //invoke fetching on render
  useEffect( () => {

    
    fetchData();
    

  }, []);
  //create state for the selected customer
  //build out options for customers to populate drop down

  const customerOptions = customers.map( (el) => {

    return ( <option value= {el.id}>{`${el.firstname} ${el.lastname}`}</option>)
  });
  const inventoryOptions = inventory.map( (el) => {

    return ( <option value= {el.size}>{`${el.size} yards`}</option>)
  });


  //Addresses
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
  //fetch new addresses any time that the selected customer changes
  useEffect( () => {
  
      //fetch the addresses of the customerId
      fetchAddresses();

  }, [newBooking.customerId ]);

  //populate address options when new addresses are fetched
  const [addressOptions, setAddressOptions] = useState([]);
  useEffect( () => {

    if(addresses){
      const customerAddresses = addresses.map( (el) => {

      return ( <option value= {el.id}>{`${el.street}, ${el.city}, ${el.state} ${el.zip}`}</option>)
    });
  setAddressOptions(customerAddresses) 
    }
    
  }, [addresses]);


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
    }catch(err){
      console.log(err)
    }
  }


  // console.log("inv",inventory)
  // console.log("cust",customers)
  // console.log("add", allAddresses)
  // console.log('book' , bookings)
  return (
    <main>
      <h1>Bookings</h1>
      <AddBooking customerOptions= {customerOptions} addressOptions= {addressOptions} inventoryOptions= {inventoryOptions}   newBooking= {newBooking} updateNewBooking= {updateNewBooking} postBooking= {postBooking}/>
      <DisplayBookings bookings= {bookings} addresses= {allAddresses} customers= {customers} inventory= {inventory} setBookings= {setBookings} fetchData= {fetchData}/>
    </main>
  )
}

export default Bookings;