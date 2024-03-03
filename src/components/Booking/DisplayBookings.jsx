import React,{useEffect, useState, } from 'react'
import BookingTable from './BookingTable';
import completePic from '../../assets/complete.png'
import calendarPic from '../../assets/calendar.png'
import inProcessPic from '../../assets/inprocess.png'

//this will render 3 booking tables
function DisplayBookings(props) {

    //destructure props
    const {bookings, addresses, customers, inventory, fetchData} = props;
    // State for each step in the process of booking. These will be separated into 3 different tables. They 
    // will each hold an array consisting of the all of the booking on that step
    const [scheduled, setScheduled] = useState([]);
    const [inProcess, setInProcess] = useState([]);
    const [complete, setComplete] = useState([]);
    
    // convert addresses, customers, inventory into objects for constant looking time. Preprocessing
    // will be O(n), and then lookup will be O(1) for "joining"
    // This state will be used to pair inventory, adresses, and customers to bookings. Will use preprocessing -- creating objects from arrays
    // (linear time complexity) to allow for constant lookup time. Time complexity would be O(n^2) if using arrays. This can also be done by adding a query to the
    // backend.
    const [addressObj, setAddressObj] = useState({});
    const [customerObj, setCustomerObj] = useState({});
    const [inventoryObj, setInventoryObj] = useState({});
    const [allBookings, setAllBookings] = useState([]);
    
    // function to update state for objects above
    const updateObjects = () => {
        //addresses
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
    // Update preprocessed data anytime that addresses, customer, or inventory changes
    useEffect( () => {
        updateObjects();
    }, [addresses, customers, inventory]);
    
    // iterate over bookings and get information into booking objects. Run every time that bookings change
    useEffect( () => {
        const tempScheduled = [];
        const tempInProcess = [];
        const tempComplete = [];

        bookings.forEach( (el, i, arr) => {
            //initialize customer, address, and inventory objects associated with current booking
            const customer = customerObj[el.customerid]; 
            const address = addressObj[el.addressid];
            const inv = inventoryObj[el.inventoryid]
            //add all booking information to temporary booking object
            const bookingObj = {...el};

            //needed to add this logic due to react errors
            //code block is adding custom properties that will be needed in the tables/boooking modal
            if(address && inventory && customer){
                bookingObj.customerName = `${customer.firstname} ${customer.lastname}`;
                bookingObj.customerPhone = `${customer.phone}`;
                bookingObj.address = `${address.street}, ${address.city}, ${address.state} ${address.zip}`; 
                bookingObj.inventory = `${inv.size}`;
            }
        
            //Switch statement to add booking object to proper array (to be used to create a table)
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
    //update state for the arrays that will generate tables
    setScheduled(tempScheduled);
    setInProcess(tempInProcess);
    setComplete(tempComplete);


    }, [bookings]);
    
    //This function is used to create three other functions below in order to properly prop drill functionality
    // to update a booking's status
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