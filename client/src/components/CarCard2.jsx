import React from 'react';
import {Link} from 'react-router-dom'
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { deleteCar} from "../redux/actions/carsActions";


const CarCard2 = ({ carData }) => {
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
              <li  className="card-list-item">
                <ion-icon name='flash-outline'></ion-icon>
                <span className="card-item-text">{carData.fuelType}</span>
              </li>
              <li  className="card-list-item">
                <ion-icon name='speedometer-outline'></ion-icon>
                <span className="card-item-text">{carData.mileage} km/ 1-litre</span>
              </li>
              <li  className="card-list-item">
                <ion-icon name='hardware-chip-outline'></ion-icon>
                <span className="card-item-text">{carData.carType}</span>
              </li>



            
          </ul>

          <div className="card-price-wrapper">
            <p className="card-price">
              <strong>{carData.rentPerHour} rs.</strong> / Hour
            </p>
            <button className="btn fav-btn" aria-label="Add to favourite list">
              <ion-icon name="heart-outline"></ion-icon>
            </button>
            
                    <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                      
                     <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>

            {/* <button className="btn1 mr-2"><Link to={/booking/${car._id}}>Book Now</Link></button> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CarCard2;