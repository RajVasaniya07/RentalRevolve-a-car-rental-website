import CarCard1 from '../components/CarCard1'; 
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "../pages/adminMain/styles.module.css"
import Footer from '../components/Footer';




const AdminHome = () => {

  const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])
  const handleLogout = () => {
    window.location ="/BookingCar";
  };
  
  const onclick = () => {
    window.location ="/new";
  };
  
  const onclick1 = () => {
    window.location ="/userbookings";
  };
  
  
  const handleLogout1 = () => {
    if (localStorage.getItem('email')) {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('seller');
      localStorage.removeItem('customer');
      window.location = "/";
    }
    else{
      window.location = "/afterHome";
    }
    };
  
  const handleLogout2 = () => {
		window.location ="/addCar";
	};


  <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout2}>
                  <span id="aria-label-txt">Add a new car</span>
                </button>

  return (
    <div>
    <header className="header" data-header>
            <div className="container">
              <div className="overlay" data-overlay />
              <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4"}}>RentalRevolve</h1>

              <a href="#" className="logo">
              </a>
              <nav className="navbar" data-navbar>
                <ul className="navbar-list">
                  
                </ul>
              </nav>
              <div className="header-actions">
                
              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button>

                {/* <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout2}>
                  <span id="aria-label-txt">Add a new car</span>
                </button> */}


                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


             
                <button className="btn user-btn" aria-label="Profile">
                <ion-icon name="person-outline" />
                </button>

                <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
                  <span className="one" />
                  <span className="two" />
                  <span className="three" />
                </button>
              </div>
            </div>
          </header>
        <ul className='featured-car-list' style={{margin:'100px'}}>
          {cars.map((car) => (
            <CarCard1 key={car._id} carData={car} />
          ))}
        </ul>

        <Footer/>
        </div>
  );
};

export default AdminHome;