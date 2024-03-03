import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user =localStorage.getItem("id");
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);



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
    <>
    <header className="header" data-header>
            <div className="container">
              <div className="overlay" data-overlay />
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
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
      <br></br>
      <br></br>

      

      <h3 className="text-center mt-2">My Bookings</h3>

    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
         
            {bookings.filter(o=>o.user==user).map((booking) => {
             return <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                    <p><b>{booking.car.name}</b></p>
                    <p>Total hours : <b>{booking.totalHours}</b></p>
                    <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                    <p>Total amount : <b>{booking.totalAmount}</b></p>
                </Col>

                <Col lg={12} sm={24}>
                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={booking.car.image}  height="140" className="p-2"/>
                </Col>
              </Row>;
            })}
          
        </Col>
      </Row>
    </>
  );
}

export default UserBookings;