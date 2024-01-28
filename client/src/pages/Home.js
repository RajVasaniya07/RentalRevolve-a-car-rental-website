import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import CarList from '../components/CarList'


function Home() {
    const {cars,loading} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    return(
        <DefaultLayout>
            <h1>Home page</h1>
            <h1>the length of cars array is {cars.length}</h1>
           
        </DefaultLayout>
    )
}
export default Home