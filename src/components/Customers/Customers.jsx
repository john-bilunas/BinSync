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
  const [modalCustomer, setModalCustomer] = useState({});
  const [showModal, setShowModal] = useState(false);//change to false for default
  const [modalEdit, setModalEdit] = useState(false);

  //functionality to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalEdit(false);
}
  console.log('Modal customer: ', modalCustomer)
  return (
    <main>
      <h1>Customers</h1>
      <div className='side-by-side'>
        <AddCustomer/>
      <AddAddress customers={customers}/>
      </div>
      
      <DisplayCustomers customers={customers} setModalCustomer= {setModalCustomer} setShowModal= {setShowModal} />
      <Modal modalCustomer= {modalCustomer} showModal= {showModal} closeModal= {closeModal} fetchCustomers= {fetchCustomers} modalEdit= {modalEdit} setModalEdit= {setModalEdit} />
    </main>
   
  )
}

export default Customers;