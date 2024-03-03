// import { useSelector , useDispatch } from 'react-redux'

// import CarCard1 from '../../components/CarCard1'; 
// import React , {useState,useEffect} from 'react'
// import DefaultLayout from '../../components/DefaultLayout'
// import { getAllCars } from '../../redux/actions/carsActions'
// import { Button, Col, Row } from 'antd'
// import {Link} from 'react-router-dom'
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";



// const index = () => {

    
//   const {cars} = useSelector(state=>state.carsReducer)
//   const dispatch = useDispatch()

//   useEffect(() => {
//       dispatch(getAllCars())
//   }, [])

  
//   const email = localStorage.getItem("email");


//   return (
//       <DefaultLayout>
//         <ul className='featured-car-list' style={{margin:'200px'}}>
//       {cars.filter(car=>car.email===email).map((car) => (
//         <CarCard1 key={car._id} carData={car} />
//       ))}
//     </ul>
//     </DefaultLayout>
    
//   )
// }

// export default index