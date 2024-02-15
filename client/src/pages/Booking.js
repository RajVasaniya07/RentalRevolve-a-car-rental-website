
import React , {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import CarDetails from "./CarDetails";

import { useSelector , useDispatch } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
function Booking(props) {
  const { carid } = useParams();
  
  const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])

  const car = cars.find(car=>car._id===carid);

  return (
    <DefaultLayout>
      <br></br>
      <h1>Booking</h1>
      <CarDetails car={car}/>
    
     
    </DefaultLayout>
  );
}

export default Booking;
