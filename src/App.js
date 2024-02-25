import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Header from './components/Header';
import Inventory from './components/Inventory/Inventory';
import Customers from './components/Customers/Customers'; 
import Bookings from './components/Bookings';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path = "/" element = {<Home/>}>Home</Route>
        <Route path= "/Customers" element = {<Customers/>}></Route> 
        <Route path= "/Inventory" element = {<Inventory/>}>Inventory</Route> 
        <Route path= "/Bookings" element = {<Bookings/>}>Bookings</Route> 
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
