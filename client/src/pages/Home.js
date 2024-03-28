import "./test.css"
import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import imgb1 from "../images/blog-1.jpg"
import imgb2 from "../images/blog-2.jpg"
import imgb3 from "../images/blog-3.jpg"
import imgb4 from "../images/blog-4.jpg"
import imgb5 from "../images/blog-5.jpg"
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import CarCard from '../components/CarCard'; 
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
// import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
const { RangePicker } = DatePicker







function NewComponent() {
    const minDate = moment(); 

    const disabledDate = current => {
        return current && current < minDate;
    };
    
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        dispatch(getAllCars())
    }, [])
    
    useEffect(() => {
    
        setTotalcars(cars)
        
    }, [cars])
    
    var i = 0;
	const handleLogout = () => {
		window.location ="/BookingCar";
	  };
	  
	  const onclick = () => {
		window.location ="/";
	  };
	  
	  const onclick1 = () => {
		window.location ="/userbookings";
	  };

    const onclick2 = () => {
      window.location ="/BookingCar";
      };

	  
	  
	  const handleLogout1 = () => {
		if (localStorage.getItem('email')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('id');

		  localStorage.removeItem('email');
		  localStorage.removeItem('token');
		  localStorage.removeItem('seller');
		  localStorage.removeItem('customer');
      localStorage.removeItem('employee');


		  window.location = "/";
		}
		else{
		  window.location = "/afterHome";
		}
		};
    


      return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>RentalRevolve - Rent your favourite car</title>
          {/* 
      - favicon
    */}
          <link rel="shortcut icon" href="./favicon.svg" type="image/svg+xml" />
          {/* 
      - custom css link
    */}
          <link rel="stylesheet" href="./assets/css/style.css" />
          {/* 
      - google font link
    */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Open+Sans&display=swap" rel="stylesheet" />
          {/* 
      - #HEADER
    */}
          <header className="header" data-header>
            <div className="container">
              <div className="overlay" data-overlay />
              <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4"}}>RentalRevolve</h1>

              {/* <h1>RentalRevolve</h1> */}

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

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1} >
                  <span id="aria-label-txt">Previous Bookings</span>
                </button>

              

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Explore cars</span>
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
          <main>
            <article>
              {/* 
          - #HERO
        */}
              <section className="section hero" id="home">
                <div className="container">
                  <div className="hero-content">
                    <h2 className="h1 hero-title">Drive Your Dreams with RentalRevolve</h2>
                    <p className="hero-text">
                      Live in Rajkot, Ahmedabad and Surat!
                    </p>
                  </div>
                  <div className="hero-banner" />
                  {/* <form action className="hero-form">
                    <div className="input-wrapper">
                      <label htmlFor="input-1" className="input-label">Car, model, or brand</label>
                      <input type="text" name="car-model" id="input-1" className="input-field" placeholder="What car are you looking?" />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="input-2" className="input-label">Max. monthly payment</label>
                      <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $" />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="input-3" className="input-label">Make Year</label>
                      <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year" />
                    </div>
                    <button type="submit" className="btn">Search</button>
                  </form> */}
                </div>
              </section>
              {/* 
          - #FEATURED CAR
        */}
              

<section className="section featured-car" id="featured-car">
                <div className="container">
                  <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured cars</h2>
                    <a  className="featured-car-link" onClick={onclick2}>
                      <span>View more</span>
                      <ion-icon name="arrow-forward-outline" />
                    </a>
                  </div>
                  </div>
<ul className='featured-car-list' style={{marginLeft:'190px',width:'1140px',height:'300px',marginBottom:'630px'}}>
      {/* {totalCars.map((car) => (
        <CarCard key={car._id} carData={car} />
      ))} */}
      {totalCars.map((car) => {
        i++;
        if(i<7){
          return (
            <CarCard key={car._id} carData={car} />)
        }
        
        
      })}
    </ul>
    </section>

              <section className="section get-start">
                <div className="container">
                  <h2 className="h2 section-title">Get started with 4 simple steps</h2>
                  <ul className="get-start-list">
                    <li>
                      <div className="get-start-card">
                        <div className="card-icon icon-1">
                          <ion-icon name="person-add-outline" />
                        </div>
                        <h3 className="card-title">Create a profile</h3>
                        <p className="card-text">
                          If you are going to use a passage of Lorem Ipsum, you need to be sure.
                        </p>
                        <a href="#" className="card-link">Get started</a>
                      </div>
                    </li>
                    <li>
                      <div className="get-start-card">
                        <div className="card-icon icon-2">
                          <ion-icon name="car-outline" />
                        </div>
                        <h3 className="card-title">Tell us what car you want</h3>
                        <p className="card-text">
                          Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="get-start-card">
                        <div className="card-icon icon-3">
                          <ion-icon name="person-outline" />
                        </div>
                        <h3 className="card-title">Match with seller</h3>
                        <p className="card-text">
                          It to make a type specimen book. It has survived not only five centuries ok ok ok ok
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="get-start-card">
                        <div className="card-icon icon-4">
                          <ion-icon name="card-outline" />
                        </div>
                        <h3 className="card-title">Make a deal</h3>
                        <p className="card-text">
                          There are many variations of passages of Lorem available, but the majority have suffered alteration
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
              {/* 
          - #BLOG
        */}
              <section className="section blog" id="blog">
                <div className="container">
                  <h2 className="h2 section-title">Our Blog</h2>
                  <ul className="blog-list has-scrollbar">
                    <li>
                      <div className="blog-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img src={imgb1} alt="Opening of new offices of the company" loading="lazy" className="w-100" />
                          </a>
                        </figure>
                        <div className="card-content">
                          <h3 className="h3 card-title">
                            <a href="#">Opening of new offices of the company</a>
                          </h3>
                          <div className="card-meta">
                            <div className="publish-date">
                              <ion-icon name="time-outline" />
                              <time dateTime="2024-02-14">February 14, 2024</time>
                            </div>
                            <div className="comments">
                              <ion-icon name="chatbubble-ellipses-outline" />
                              <data value={114}>114</data>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img src={imgb2} alt="What cars are most vulnerable" loading="lazy" className="w-100" />
                          </a>
                        </figure>
                        <div className="card-content">
                          <h3 className="h3 card-title">
                            <a href="#">What cars are most vulnerable</a>
                          </h3>
                          <div className="card-meta">
                            <div className="publish-date">
                              <ion-icon name="time-outline" />
                              <time dateTime="2024-02-14">February 14, 2024</time>
                            </div>
                            <div className="comments">
                              <ion-icon name="chatbubble-ellipses-outline" />
                              <data value={114}>114</data>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img src={imgb3} alt="Statistics showed which average age" loading="lazy" className="w-100" />
                          </a>
                        </figure>
                        <div className="card-content">
                          <h3 className="h3 card-title">
                            <a href="#">Statistics showed which average age</a>
                          </h3>
                          <div className="card-meta">
                            <div className="publish-date">
                              <ion-icon name="time-outline" />
                              <time dateTime="2024-02-14">February 14, 2024</time>
                            </div>
                            <div className="comments">
                              <ion-icon name="chatbubble-ellipses-outline" />
                              <data value={114}>114</data>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img src={imgb4} alt="What´s required when renting a car?" loading="lazy" className="w-100" />
                          </a>
                        </figure>
                        <div className="card-content">
                          <h3 className="h3 card-title">
                            <a href="#">What´s required when renting a car?</a>
                          </h3>
                          <div className="card-meta">
                            <div className="publish-date">
                              <ion-icon name="time-outline" />
                              <time dateTime="2024-02-14">February 14, 2024</time>
                            </div>
                            <div className="comments">
                              <ion-icon name="chatbubble-ellipses-outline" />
                              <data value={114}>114</data>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img src={imgb5} alt="New rules for handling our cars" loading="lazy" className="w-100" />
                          </a>
                        </figure>
                        <div className="card-content">
                          <h3 className="h3 card-title">
                            <a href="#">New rules for handling our cars</a>
                          </h3>
                          <div className="card-meta">
                            <div className="publish-date">
                              <ion-icon name="time-outline" />
                              <time dateTime="2024-02-14">February 14, 2024</time>
                            </div>
                            <div className="comments">
                              <ion-icon name="chatbubble-ellipses-outline" />
                              <data value={114}>114</data>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            </article>
          </main>
          {/* 
      - #FOOTER
    */}
          <footer className="footer">
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
          {/* 
      - custom js link
    */}
          {/* 
      - ionicon link
    */}
        </div>
      );
    
  }

  export default NewComponent;