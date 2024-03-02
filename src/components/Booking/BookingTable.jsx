import React, { useEffect } from 'react'
import BookingRows from './BookingRows';

 

function BookingTable(props) {
    const {bookings, title, firstCol, secondCol, titlePic, fetchData, firstUpdateFunction, secondUpdateFunction} = props;
    //build out rows

        const rows = bookings.map( (el) => {

            return (
                <BookingRows bookId= {el.id} name= {el.customerName} address= {el.address} inventory= {el.inventory} dropoff= {el.dropoff} pickup= {el.pickup} firstCol= {firstCol} secondCol= {secondCol} fetchData={fetchData} firstUpdateFunction={firstUpdateFunction} secondUpdateFunction= {secondUpdateFunction} />
            )
        });
    return (
        <>
        
        <h2>{title}</h2>
        <div className= 'center-container'><img src= {titlePic} alt="" className= 'title-pic'/></div>
        
            <div className="table-container">
            
            <table id= 'booking-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Dumpster</th>
                        <th>Dropoff</th>
                        <th>Pickup</th>
                        <th>Change Status</th>
                        <th>Change Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            
    </div>        
        </>

  )
}

export default BookingTable;