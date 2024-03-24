import { useSelector , useDispatch } from 'react-redux'

import CarCard1 from '../../components/CarCard1'; 
import React , {useState,useEffect} from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import { getAllCars } from '../../redux/actions/carsActions'
import { Button, Col, Row } from 'antd'
import {Link} from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Container } from 'react-bootstrap';
import '../afterHome/style.module.css'
// import '../../images/review.png'

const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
        window.location = "/login";
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            // setError(error.response.data.message);
        }
    }
};
const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
        window.location = "/adminlogin";
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            // setError(error.response.data.message);
        }
    }
};
const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
        window.location = "/sellerLogin";
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            // setError(error.response.data.message);
        }
    }
};
const handleSubmit4 = async (e) => {
  e.preventDefault();
  try {
      window.location = "/EmployeeLogin";
  } catch (error) {
      if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
      ) {
          // setError(error.response.data.message);
      }
  }
};

const index = () => {
  return (
    

   
        <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto" color='#1A9DF4'>
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Login as</h1>
          {/* <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.</p> */}
          
        </div>
        <div class="flex flex-wrap -m-4">
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2  flex flex-col relative overflow-hidden" style={{border:"solid #092635 2px "}}>
              <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">User</h1>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Search and book a car
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Find cars for your time slot
              </p>
              <p class="flex items-center text-gray-600 mb-6">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Access your bookings
              </p>
              <br></br>
              <br></br>
              <button class="flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded" style={{background:"#1A9DF4"}} onClick={handleSubmit1}>Login
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2  flex flex-col relative overflow-hidden" style={{border:"solid #092635 2px "}}>
              <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Seller</h1>

              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>List your car
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Edit your car details any time
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Remove your car
              </p>
              
              <button class="flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded" style={{background:"#1A9DF4"}} onClick={handleSubmit3}>Login
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2  flex flex-col relative overflow-hidden" style={{border:"solid #092635 2px "}}>
              <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Employee</h1>

              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>List your car
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Edit your car details any time
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Remove your car
              </p>
              
              <button class="flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded" style={{background:"#1A9DF4"}} onClick={handleSubmit4}>Login
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden" style={{border:"solid #092635 2px "}}>
            <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Admin</h1>

              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Access all listed cars
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Add company's car
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Edit details and remove cars
              </p>
              
              <button class="flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded" style={{background:"#1A9DF4"}}  onClick={handleSubmit2}>Login
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
      


)}

export default index



{/* <button onClick={handleSubmit1}>
                user
            </button>
            <button onClick={handleSubmit2}>
                admin
            </button>
            <button onClick={handleSubmit3}>
                seller
            </button> */}