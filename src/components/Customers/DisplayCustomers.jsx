import React from 'react'
import CustomerRow from './CustomerRow';
function DisplayCustomers(props) {
    const {customers, setModalCustomer, setShowModal } = props;



    //iterate through customers and create the new row with it
    const customerData = customers.map( (el) => {
        return <CustomerRow key= {`customer-${el.id}`} id= {el.id} firstname= {el.firstname} lastname= {el.lastname} phone= {el.phone} email= {el.email} notes= {el.notes} setModalCustomer= {setModalCustomer} setShowModal= {setShowModal}/>

    })

    console.log("Customers", customers);
  return (
    <>
        <h2>Customer Table</h2>
        <div className= 'table-container'>
            <table id='customer-table'>
                <thead>
                    <tr>
                        <th id= 'user-logo-column'></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData}
                </tbody>
            </table>
        </div>
    </>
    
    
  )
}

export default DisplayCustomers;