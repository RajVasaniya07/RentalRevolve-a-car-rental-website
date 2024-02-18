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

  return (
    <>
      <br />
      <br />
      <h1>Booking</h1>
      {car ? <CarDetails car={car} /> : <p>Car details not found</p>}
    </>
  );
}

export default Booking;
