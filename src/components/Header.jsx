import React from 'react'
import {Link} from 'react-router-dom';
function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to= '/Inventory'>Inventory</Link>
        </li>
        <li>
          <Link to= '/Customers'>Customers</Link>
        </li>
        <li>
          <Link to= '/Bookings'>Bookings</Link>
        </li>
      </ul>
    </nav>


  )
}

export default Header;