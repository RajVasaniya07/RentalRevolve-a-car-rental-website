import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import CarList from '../components/CarList'
import styles from "../pages/Main/styles.module.css"


function Home() {
    const {cars,loading} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			window.location = "/afterHome";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				// setError(error.response.data.message);
			}
		}
	};
	const handleLogout = () => {
		window.location ="/BookingCar";
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


    return(
	<div>
		<div className={styles.main_container}>
          <nav className={styles.navbar}>
            <div className={styles.left_side}>
			<h1>RentalRevovle</h1>
            </div>
			<button className={styles.white_btn1} onClick={handleLogout1}>
			{localStorage.getItem('email') ? 'Logout' : 'Login'}
            </button>
           
            <button className={styles.white_btn} onClick={handleLogout}>
              Book a ride
            </button>

			
            
          </nav>
		  
        </div>
	</div>
    )
}
export default Home




			//#9855f0