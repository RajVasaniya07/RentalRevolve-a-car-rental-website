// Header.js

import React from "react";

const Header = () => {


    const handleLogout = () => {
		window.location ="/submitdata";
	  };
	  
	  const onclick = () => {
		window.location ="/";
	  };
	  
	  const onclick1 = () => {
		window.location ="/empDash";
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

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1} >
                  <span id="aria-label-txt">Today's Bookings</span>
                </button>

              

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Form</span>
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
  );
};

export default Header;