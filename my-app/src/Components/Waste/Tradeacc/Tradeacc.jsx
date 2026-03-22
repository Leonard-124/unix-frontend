
import React, {useState, useEffect} from 'react'
//import bike from "../../../assets/images/bike.jpg"
//import Coke from "../../../assets/images/Coke.jpg"
//import ferari from "../../../assets/images/ferari.jpg"
//import redcar from "../../../assets/images/redcar.jpg"
import { Link } from 'react-router-dom'

const Tradeacc = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const Images = [bike, Coke, ferari, redcar]
  useEffect(()=> {
    const interval = setInterval(()=>{
      setCurrentImage((prev) =>(prev + 1) % Images.length)
    },8000)
    return () => clearInterval(interval)
  },[])
  return (
    <div className='mt-22 w-full mb-10 flex justify-between tracking-[1px]font-[400] bg-blue-50'>
      <div className=' flex flex-col text-[18px] items-center'>
        <h1 className='font-[600] tracking-[-1px] text-[20px]'>Welcome To Unix Trade</h1>
        <p>Create Your Trade Account and start posting Your products and services.</p>
        <p>All you need is a quick registration of your products and services.</p>
        <Link to="/trade">
        <div className='bg-green-500 shadow-2xl rounded font-[700] tracking-[-1px] text-red-700 p-5 w-[250px] m-2 cursor-pointer'>Click to create your Seller Account.</div>
        </Link>
      </div>
      <div className='w-[1100px] h-[500px]'>
        <img src={Images[currentImage]} alt={null} className='shadow w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default Tradeacc;





