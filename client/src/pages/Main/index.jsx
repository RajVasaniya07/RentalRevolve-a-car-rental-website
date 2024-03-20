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

  const onclick = () => {
    window.location ="/";
  };
  
  const onclick1 = () => {
    window.location ="/sellerdashboard";
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
  
  const handleLogout2 = () => {
		window.location ="/addCar";
	};
  
  const email = localStorage.getItem("email");

	return (
		<div className={styles.main_container}>
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

                <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1}>
                  <span id="aria-label-txt">charts</span>
                </button>

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout2}>
                  <span id="aria-label-txt">Add a new car</span>
                </button>


                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
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
			<ul className='featured-car-list' style={{margin:'100px'}}>
      {cars.filter(car=>car.email===email).map((car) => (
        <CarCard1 key={car._id} carData={car} />
      ))}
    </ul>
		</div>
	);
};

export default Main;