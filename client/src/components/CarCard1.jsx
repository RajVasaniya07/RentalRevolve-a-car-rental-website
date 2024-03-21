// import React from 'react';
import { Link } from 'react-router-dom'
import React , {useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { deleteCar, CheckAvailability } from "../redux/actions/carsActions";


const CarCard1 = ({ carData }) => {

  //const { car } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const [flag,setFlag] = useState(carData.availability);
  
  return (
    <li>
      <div className="featured-car-card">
        <figure className="card-banner">
          <img
            src={carData.image}
            alt={carData.name}
            loading="lazy"
            width="440"
            height="300"
            className="w-100"
          />
        </figure>

        <div className="card-content">
          <div className="card-title-wrapper">
            <h3 className="h3 card-title">
              <a href="#">{carData.name}</a>
            </h3>
            <data className="year" value={carData.year}>
              {carData.year}
            </data>
          </div>

          <ul className="card-list">
            <li className="card-list-item">
              <ion-icon name='people-outline'></ion-icon>
              <span className="card-item-text">{carData.capacity} People</span>
            </li>
            <li className="card-list-item">
              <ion-icon name='flash-outline'></ion-icon>
              <span className="card-item-text">{carData.fuelType}</span>
            </li>
            <li className="card-list-item">
              <ion-icon name='speedometer-outline'></ion-icon>
              <span className="card-item-text">{carData.mileage} km/ 1-litre</span>
            </li>
            <li className="card-list-item">
              <ion-icon name='hardware-chip-outline'></ion-icon>
              <span className="card-item-text">{carData.carType}</span>
            </li>
          </ul>

          <div className="card-price-wrapper">
            <p className="card-price">
              <strong>{carData.rentPerHour} rs.</strong> / Hour
            </p>

            <Link to={`/editcar/${carData._id}`}>
              <EditOutlined
                className="mr-3"
                style={{ color: "green", cursor: "pointer" }}
              />
            </Link>
            <Popconfirm
              title="Are you sure to delete this car?"
              onConfirm={() => { dispatch(deleteCar({ carid: carData._id })) }}

              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ color: "red", cursor: "pointer" }}
              />
            </Popconfirm>

            <button 
  onClick={(e) => {
    dispatch(CheckAvailability({ _id: carData._id, availability: !flag }))
    setFlag(!flag);
  }}  
  style={{ 
    color: flag ? 'green' : 'red',
    backgroundColor: 'transparent', // Setting the background color to transparent
    border: 'none', // Remove the border if needed
    cursor: 'pointer' // Ensure cursor changes to pointer on hover
  }}
>
  {flag === true ? "Available" : "Not Available"}
</button>


            {/* <button className="btn1 mr-2"><Link to={/booking/${car._id}}>Book Now</Link></button> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CarCard1;