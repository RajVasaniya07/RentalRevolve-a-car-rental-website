import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import CarDetails from './CarDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';

function Booking(props) {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.carsReducer);
  const [car, setCar] = useState(null);

  useEffect(() => {
    console.log('Fetching cars...');
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    console.log('Cars:', cars);
    const foundCar = cars.find((car) => car._id === carid);
    console.log('Found car:', foundCar);
    setCar(foundCar);
  }, [cars, carid]);

  console.log('Loading:', loading);

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while Redux state is loading
  }

  const handleLogout = () => {
    window.location ="/BookingCar";
  };
  
  const onclick = () => {
    window.location ="/";
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

  return (
    <><header className="header" data-header>
    <div className="container">
      <div className="overlay" data-overlay />
      <h1>Booking</h1>

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

        <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
          <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
        </button>


      <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1} >
          <span id="aria-label-txt">User Bookings</span>
        </button>

      

        <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
          <span id="aria-label-txt">Explore cars</span>
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
      <br />
      <br />
      {/* <center><h1 style={{display:"inline"}}>Booking</h1></center> */}
      {car ? <CarDetails car={car} /> : <p>Car details not found</p>}
    </>
  );
}

export default Booking;