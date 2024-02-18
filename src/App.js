import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Header from './components/Header';
import Inventory from './components/Inventory';
import Customers from './components/Customers'; 
import Bookings from './components/Bookings';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path = "/" element = {<Home/>}>Home</Route>
        <Route path= "/Customers" element = {<Customers/>}>Inventory</Route> 
        <Route path= "/Inventory" element = {<Inventory/>}>Inventory</Route> 
        <Route path= "/Bookings" element = {<Bookings/>}>Inventory</Route> 
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
