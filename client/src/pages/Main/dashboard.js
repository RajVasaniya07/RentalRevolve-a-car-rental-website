import React from 'react';
import RevenueGraph from './Revenue';
import UserBookingsGraph from './graph';
import Footer from '../../components/Footer';

const Dashboard = () => {


  const handleLogout = () => {
		window.location ="/Main";
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
  return (<div>

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
                
              {/* <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button> */}

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


           

              

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Home</span>
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0', padding: '20px',backgroundColor:"#EDF1F7" }}>
      <div style={{ width: '50%', marginRight: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Bookings Graph</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#fff' }}>
          <UserBookingsGraph />
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Graph</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#fff' }}>
          <RevenueGraph />
        </div>
      </div>

    </div>
    <Footer/>

    </div>
  );
};

export default Dashboard;
