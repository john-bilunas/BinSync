import React from 'react'
import customerInfoPic from '../../assets/user.png'

function CustomerRow(props) {

    const {firstname, lastname, id, email, notes, phone, setModalCustomer, setShowModal } = props;
  return (
   
    <tr className= 't'>
        <td><img src={customerInfoPic} alt="More customer info" className= 'table-picture' 
        onClick= { () => {
          setModalCustomer({firstname, lastname, id, email, notes, phone });
          setShowModal(true);

        }}/></td>
        <td>{`${firstname} ${lastname}`}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{notes}</td>
    </tr>
  )
}

export default CustomerRow;