import React from 'react'
import {format} from 'date-fns';
import info from '../../assets/info.png'
function BookingRows(props) {
    const {bookId, name, address, inventory, dropoff, pickup, firstCol, secondCol, firstUpdateFunction, secondUpdateFunction} = props;
    console.log('bookid', bookId)
    return (
    <tr>
        <td>
            <img src={info} alt="" className= 'table-picture'/>
        </td>
        <td>{name}</td>
        <td>{address}</td>
        <td>{`${inventory} yards`}</td>
        <td>{format(dropoff, 'EEEE, MMM do')}</td>
        <td>{format(pickup, 'EEEE, MMM do')}</td>
        <td>
            <img src={firstCol} alt="" className= 'large-table-picture' 
            onClick = { () => {
                firstUpdateFunction(bookId);
            }}/>
        </td>
        <td>
            <img src={secondCol} alt="" className= 'large-table-picture'
            onClick = { () => {
                secondUpdateFunction(bookId);
            }}/>
        </td>
    </tr>
  )
}

export default BookingRows;