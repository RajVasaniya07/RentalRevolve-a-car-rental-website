import styles from "../red/styles.module.css";
import { useState, useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux'
import CarCard1 from "../../components/CarCard1";
import { getAllCars } from "../../redux/actions/carsActions"

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		localStorage.removeItem("seller");

		window.location ="/";
	};

	const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])

  const handleLogout1 = () => {
	window.location ="/addCar";
};
  
  const email = localStorage.getItem("email");

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Dashbord</h1>
				<button className={styles.white_btn1} onClick={handleLogout1}>
              Add car
            </button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<ul className='featured-car-list' style={{margin:'100px'}}>
      {cars.filter(car=>car.email===email).map((car) => (
        <CarCard1 key={car._id} carData={car} />
      ))}
    </ul>
		</div>
	);
};

export default Main;
