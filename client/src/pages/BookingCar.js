import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import CarCard from '../components/CarCard'; 
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
// import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
const { RangePicker } = DatePicker




const BookingCar = () => {
  // const minDate = moment();
  const minDate = moment(); 

const disabledDate = current => {
    return current && current < minDate;
};

const {cars} = useSelector(state=>state.carsReducer)
const {loading} = useSelector(state=>state.alertsReducer)
const [totalCars , setTotalcars] = useState([])
const dispatch = useDispatch()


useEffect(() => {
    dispatch(getAllCars())
}, [])

useEffect(() => {

    setTotalcars(cars)
    
}, [cars])


function setFilter(dates, dateStrings) {
  var selectedFrom = moment(dateStrings[0]);
  var selectedTo = moment(dateStrings[1]);

  var temp = [];

  for (var car of cars) {
    var isAvailable = true;

    for (var booking of car.bookedTimeSlots) {
      var bookingFrom = moment(booking.from);
      var bookingTo = moment(booking.to);

      if (
        (selectedFrom.isBetween(bookingFrom, bookingTo) ||
          selectedTo.isBetween(bookingFrom, bookingTo)) ||
        (bookingFrom.isBetween(selectedFrom, selectedTo) ||
          bookingTo.isBetween(selectedFrom, selectedTo))
      ) {
        // If the selected time slot overlaps with any booked time slot, mark the car as unavailable
        isAvailable = false;
        break; // No need to check further booked time slots for this car
      }
    }

    if (isAvailable) {
      temp.push(car);
    }
  }

  setTotalcars(temp);
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

      
    
      <div>
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
          
        <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-left filter-container' >
                    <RangePicker disabledDate={disabledDate} showTime={{ format: 'HH:mm' }} format="MMM DD YYYY HH:mm" onChange={setFilter} />
                </Col>
            </Row>
            
        <ul className='featured-car-list' style={{margin:'200px'}}>
      {totalCars.map((car) => (
        
        <CarCard key={car._id} carData={car} />
      ))}
    </ul>
    </div>
    
  );
};

export default BookingCar;