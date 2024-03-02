import React,{useEffect, useState, } from 'react'
import BookingTable from './BookingTable';
import completePic from '../../assets/complete.png'
import calendarPic from '../../assets/calendar.png'
import inProcessPic from '../../assets/inprocess.png'

//this will render 3 booking tables
function DisplayBookings(props) {

    //destructure props
    const {bookings, addresses, customers, inventory, fetchData} = props;
    // state for each step in the process of booking. These will be separated into 3 different tables
    const [scheduled, setScheduled] = useState([]);
    const [inProcess, setInProcess] = useState([]);
    const [complete, setComplete] = useState([]);
    
    // convert addresses, customers, inventory into objects for constant looking time. Preprocessing
    // will be O(n), and then lookup will be O(1) for "joining"
    const [addressObj, setAddressObj] = useState({});
    const [customerObj, setCustomerObj] = useState({});
    const [inventoryObj, setInventoryObj] = useState({});
    const [allBookings, setAllBookings] = useState([]);
    
    const updateObjects = () => {

        
    setAddressObj( () => {
        const retAddresses = {};
        addresses.forEach( (el) => {
            retAddresses[el.id] = el;
    })
        return retAddresses;
    }
       );

    //customers

    setCustomerObj((prev) => {
        const retCustomers = {};
        customers.forEach( (el) => {

            
            retCustomers[el.id] = el;
    });
    return retCustomers;
    });

    //inventory
    
    setInventoryObj(() => {
        const retInventory = {};
        inventory.forEach( (el) => {
            retInventory[el.size] = el;
    })
    return retInventory;
    });
    }

    useEffect( () => {
        updateObjects();
    }, [addresses, customers, inventory]);
    
    // iterate over bookings and get information into booking objects
    
    useEffect( () => {
        const tempScheduled = [];
        const tempInProcess = [];
        const tempComplete = [];


        // console.log("booking obj: ")
        bookings.forEach( (el, i, arr) => {
        
        const customer = customerObj[el.customerid]; 
        const address = addressObj[el.addressid];
        const inv = inventoryObj[el.inventoryid]

        const bookingObj = {...el};
        // console.log("firstname", customer.firstname)

        if(address && inventory && customer){
            bookingObj.customerName = `${customer.firstname} ${customer.lastname}`;
             bookingObj.address = `${address.street}, ${address.city}, ${address.state} ${address.zip}`; 
            bookingObj.inventory = `${inv.size}`;
        }
       
        
        switch(bookingObj.bookingstatus){
            case 'scheduled':
                tempScheduled.push(bookingObj);
                break;
            case 'inprocess':
                tempInProcess.push(bookingObj)
                break;
            case 'complete':
                tempComplete.push(bookingObj)
                break;
                //
            default:
                //nothing
                break;
        }
    });

    setScheduled(tempScheduled);
    setInProcess(tempInProcess);
    setComplete(tempComplete);


    }, [bookings]);
    


    // console.log("scheduled", scheduled);
    // console.log("inprocess", inProcess);
    // console.log("complete",complete);
    

    const updateBookingStatus = async (id, status) => {
        const bod = {
          bookingstatus: status
        };
        try {
          let response = await fetch(`/booking/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bod)
          });
          response = await response.json();
          console.log(response);
          fetchData();
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      };
      
      const toScheduled = (id) => updateBookingStatus(id, 'scheduled');
      const toInProcess = (id) => updateBookingStatus(id, 'inprocess');
      const toComplete = (id) => updateBookingStatus(id, 'complete');
      

    
  return (
    <>
        <BookingTable bookings= {scheduled} title= {'Scheduled'} firstCol= {inProcessPic} secondCol= {completePic} titlePic = {calendarPic} fetchData={fetchData} firstUpdateFunction= {toInProcess} secondUpdateFunction= {toComplete} />
        <BookingTable bookings= {inProcess} title= {'In Process'}  firstCol= {calendarPic} secondCol= {completePic} titlePic = {inProcessPic} fetchData={fetchData} firstUpdateFunction= {toScheduled} secondUpdateFunction= {toComplete} />
        <BookingTable bookings= {complete} title= {'Complete'} firstCol= {calendarPic} secondCol= {inProcessPic} titlePic = {completePic} fetchData={fetchData} firstUpdateFunction= {toScheduled} secondUpdateFunction= {toInProcess} />
    </>
  )
}

export default DisplayBookings;