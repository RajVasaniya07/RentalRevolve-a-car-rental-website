import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRental } from "../../redux/actions/rentalActions";

// Import your additional components here
// import Header from "../../components/Header";
// import Sidebar from "../../components/SideBar";

const Index = () => {
  const { rental } = useSelector((state) => state.rentalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRental());
  }, []);

  function onClick(e) {
    const rentalId = e.target.name;
    dispatch({ type: 'REMOVE_PENDING_RENTAL', payload: rentalId });

    window.location = `/submitdata/${e.target.name}`;
  }

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
  console.log(rental);

  return (
    <div>
      {/* Include the Header component */}
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

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1} >
                  <span id="aria-label-txt">Today's Bookings</span>
                </button>

              

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Booking detail's</span>
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
      <br />
      <br />
      <br />

      {/* Include the Sidebar component */}
      {/* <Sidebar /> */}

      {/* Main content */}
      <div className="mx-auto mt-16 max-w-2xl">
  <table className="w-full table-auto border">
    <thead>
      <tr>
        <th className="border p-4">Car ID</th>
        <th className="border p-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {rental
        .filter((rent) => rent.status === "pending")
        .map((rent) => (
          <tr key={rent._id}>
            <td className="border p-4">{rent.carId}</td>
            <td className="border p-4">
            <center>  <button
                onClick={onClick}
                name={rent._id}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button></center>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Index;
