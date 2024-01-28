import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

function Booking() {
  const { carid } = useParams();

  return (
    <DefaultLayout>
      <br></br>
      <h1>Booking</h1>
      <h1>Booking</h1>
      
      <h1>Car ID: {carid}</h1>
    </DefaultLayout>
  );
}

export default Booking;
