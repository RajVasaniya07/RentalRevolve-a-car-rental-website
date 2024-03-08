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
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const handleLogout = () => {
    window.location = "/BookingCar";
  };

  const onclick = () => {
    window.location = "/";
  };

  const onclick1 = () => {
    window.location = "/userbookings";
  };

  const handleLogout1 = () => {
    if (localStorage.getItem('email')) {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('seller');
      localStorage.removeItem('customer');
      window.location = "/";
    } else {
      window.location = "/afterHome";
    }
  };

  return (
    <>
      <header className="header" data-header>
        {/* Header content */}
      </header>
      {/* {loading && (<Spinner />)} */}
      <h3 className="text-center mt-2">My Bookings</h3>
      <br></br>
      <br></br>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings.filter(o => o.user == user).map((booking) => {
            // Add null check for booking.car
            if (booking.car && booking.car.name) {
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
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
                    <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className="p-2" />
                  </Col>
                </Row>
              );
            } else {
              return null; // Skip rendering if booking.car or booking.car.name is null
            }
          })}
        </Col>
      </Row>
    </>
  );
}

export default UserBookings;
