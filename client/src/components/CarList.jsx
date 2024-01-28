
import CarCard from './CarCard'; // Adjust the import path based on your project structure
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'



const CarList = () => {

  const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])



    
  

  return (
    <ul className='featured-car-list' style={{margin:'200px'}}>
      {cars.map((car) => (
        <CarCard  carData={car} />
      ))}
    </ul>
  );
};

export default CarList;