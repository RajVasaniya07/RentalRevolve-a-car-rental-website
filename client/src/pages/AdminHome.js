import CarCard1 from '../components/CarCard1'; 
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "../pages/adminMain/styles.module.css"




const AdminHome = () => {

  const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])

  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
    localStorage.removeItem("admin");


		window.location ="/";
	};
  const handleLogout1 = () => {
		window.location ="/addCar";
	};

  return (
    <div>
    <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <div className={styles.left_side}>
            <h1>Dashboard</h1>

            </div>
            <button className={styles.white_btn1} onClick={handleLogout1}>
              Add car
            </button>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
            
          </nav>
        </div>
        <ul className='featured-car-list' style={{margin:'100px'}}>
          {cars.map((car) => (
            <CarCard1 key={car._id} carData={car} />
          ))}
        </ul>
        </div>
  );
};

export default AdminHome;