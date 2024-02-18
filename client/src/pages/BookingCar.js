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


    return (

      
    
      <>
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
    </>
    
  );
};

export default BookingCar;