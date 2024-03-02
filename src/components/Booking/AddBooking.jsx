import React from 'react'

function AddBooking(props) {
const {customerOptions, addressOptions, inventoryOptions, updateNewBooking, newBooking, postBooking} = props;


  return (
    <div id= 'booking-form-container'>
        <form id= 'booking-form' className= 'column'> 
            <select name="" id="booking-form-customers"  onChange={ (e) => { updateNewBooking('customerId', e.target.value )}}>
                <option > --Select Customer--</option>
                {customerOptions}
            </select>
            <select name="" id="booking-form-inventory" value= {newBooking.inventoryId} onChange={ (e) => { updateNewBooking('inventoryId', e.target.value )}}>
                <option value= ''> --Select Dumpster--</option>
                {inventoryOptions}
            </select>
            <select name="" id="booking-form-addresses" onChange={ (e) => { updateNewBooking('addressId', e.target.value )}}>
                <option value= ''> --Select Address--</option>
                {addressOptions}
            </select>
            <div className="block">
            <label htmlFor="">Drop off</label>
            <input type="date" name="" id="" onChange={ (e) => { updateNewBooking('dropoff', e.target.value )}}/>
            </div>
            <div className="block">
            <label htmlFor="">Pick up</label>
            <input type="date" name="" id="" onChange={ (e) => { updateNewBooking('pickup', e.target.value )}}/>
            </div>
            <div className="column">
                <label>Booking notes</label>
                <textarea name="" id="" cols="30" rows="10" value= {newBooking.notes} onChange={ (e) => { updateNewBooking('notes', e.target.value )}}></textarea>
            </div>

            <button onClick={postBooking}>Book Now</button>
        </form>
    </div>
  )
}

export default AddBooking