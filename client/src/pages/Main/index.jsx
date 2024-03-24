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


              <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4"}}>RentalRevolve</h1>



              <a href="#" className="logo">
              </a>
              <nav className="navbar" data-navbar>
                <ul className="navbar-list">
                  
                </ul>
              </nav>
              <div className="header-actions">
                
              {/* <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button> */}

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
    <footer className="footer"  style={{position:"absolute",left:"0",right:"0",paddingbottom:"60px"
}}>
            <div className="container">
              <div className="footer-top">
                <div className="footer-brand">
                  <a href="#" className="logo">
                    {/* <img src={logo} alt="Ridex logo" /> */}
                  </a>
                  <p className="footer-text">
                    Search for cheap rental cars in Gujarat. With a diverse fleet of 1200 type of vehicles, RentalRevolve offers its
                    consumers an
                    attractive and fun selection.
                  </p>
                </div>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Company</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">About us</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Pricing plans</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Our blog</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Contacts</a>
                  </li>
                </ul>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Support</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Help center</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Ask a question</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Privacy policy</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Terms &amp; conditions</a>
                  </li>
                </ul>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Neighborhoods of Rajkot</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Ahmedabad</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Surat</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Vadodara</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Bhavnagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Jamnagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Gandhinagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Anand</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Junagadh</a>
                  </li>
                </ul>
              </div>
              <div className="footer-bottom">
                <ul className="social-list">
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-skype" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="mail-outline" />
                    </a>
                  </li>
                </ul>
                <p className="copyright">
                  © 2024 <a href="#">RentalRevolve</a>. All Rights Reserved
                </p>
              </div>
            </div>
          </footer>
		</div>
	);
};

export default Main;