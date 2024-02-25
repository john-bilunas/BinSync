import React, {useEffect, useState} from 'react'
import DisplayCustomers from './DisplayCustomers';
import AddCustomer from './AddCustomer';
import AddAddress from './AddAddress';
import Modal from '../Modal';
function Customers() {

  const [customers, setCustomers] = useState([]);
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
  useEffect( () => {
    const fetchData = () => fetchCustomers();
    fetchData();
  }, []);


  //state to update the customer's id for the modal
  const [modalCustomer, setModalCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);//change to false for default

  const closeModal = () => {

    //change state to hide the
    setShowModal(false);
}
  console.log('Modal customer: ', modalCustomer)
  return (
    <>
      <h1>Customers</h1>
      <AddCustomer/>
      <AddAddress customers={customers}/>
      <DisplayCustomers customers={customers} setModalCustomer= {setModalCustomer} setShowModal= {setShowModal}/>
      <Modal custId= {modalCustomer} showModal= {showModal} closeModal= {closeModal}/>
    </>
   
  )
}

export default Customers;