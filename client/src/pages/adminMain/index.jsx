import styles from "./styles.module.css";
import CarCard1 from "../../components/CarCard1";
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from "../../components/DefaultLayout";
import { getAllCars } from "../../redux/actions/carsActions";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		localStorage.removeItem("admin");

		window.location ="/";
	};

	const {cars} = useSelector(state=>state.carsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCars())
  }, [])

	return (
			<div>
<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Dashboard</h1>
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

export default Main;
