import React, { useState, useEffect, useContext}from 'react'
// import burger3 from "../assets/images/burger3.jpg"
// import ferari from "../assets/images/ferari.jpg"
// import lambogini from "../assets/images/lambogini.jpg"
// import sweets from "../assets/images/sweets.jpg"
import { CartContext } from '../Context/Context'

const Trending = () => {
    const [currentImage, setCurrentImage] = useState(0)
    //const { addToCart } = useContext(CartContext)


    const images = [burger3, ferari, lambogini, sweets]

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentImage((prev)=> (prev + 1) % images.length)
        },4000)
        return ()=> clearInterval(interval)
    },[images.length])

    const handleBuyNow = ({setSelectedCategory}) => {
      //addToCart(images[currentImage])
      setSelectedCategory(images[currentImage])
    }
  return (
    <div className=' flex justify-between mt-20 bg-red-50'>
      <div className='ml-9'>
        <h1 className='text-[40px] text-gray-600 mt-12'>Trending Products</h1>
      </div>
      <div className=' flex  w-[1100px] h-[500px] relative'>
        <img src={images[currentImage]} alt="" className='w-full h-full object-cover' />
        <div className='absolute bottom-0 text-yellow-300 font-[600] m-60 cursor-pointer italic text-2xl tracking-[-1px]' onClick={handleBuyNow}>Buy Now</div>
      </div>
    </div>
  )
}

export default Trending
