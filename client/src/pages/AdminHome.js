
import CarCard1 from '../components/CarCard1'; 
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'




const AdminHome = () => {

  const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])



    
  

  return (
    <DefaultLayout>
        <ul className='featured-car-list' style={{margin:'200px'}}>
      {cars.map((car) => (
        <CarCard1 key={car._id} carData={car} />
      ))}
    </ul>
    </DefaultLayout>
    
  );
};

export default AdminHome;