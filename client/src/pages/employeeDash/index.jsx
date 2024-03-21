import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRental } from "../../redux/actions/rentalActions";

// Import your additional components here
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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

  console.log(rental);

  return (
    <div>
      {/* Include the Header component */}
      <Header />
      <br />
      <br />
      <br />

      {/* Include the Sidebar component */}
      {/* <Sidebar /> */}

      {/* Main content */}
      <div className="mx-auto mt-16 max-w-2xl">
  <table className="w-full table-auto border">
    <thead >
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




      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}

      
      
<br></br>

<br></br>      {/* Include the Footer component */}
      <Footer />
    </div>
  );
};

export default Index;