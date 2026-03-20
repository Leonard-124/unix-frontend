
import React, { useState, useEffect } from 'react'
import eastart from "../assets/Arts/eastart.png"
import mask_art from "../assets/Arts/mask_art.png"
import nicigoten from "../assets/Arts/nicigoten.jpg"
import fotios from "../assets/Arts/fotios.jpg"

const About = () => {
    const Images = [eastart, mask_art, nicigoten, fotios]
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % (Images.length))
        }, 6000)

        return () => clearInterval(interval)
    }, [])

  return (
    <div className='mt-28 px-4 sm:px-6 lg:px-12'>
        <h1 className='text-center text-2xl sm:text-3xl font-bold mb-10'>About Us</h1>
        <div className=' flex justify-between font-light text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed'>
            <div>
                <p>
                    We are focused on the selling of artworks, woodworks, paintings and other unique collections to potential buyers.Once the buyer makes his order, we'll ensure that the buyers's collection reaches its destination in due time as per the agreed time. UnixArt also engages various collectors, artists and innovators from around the world to build a better and strong community 
                </p>
                <h2 className='text-center font-bold '>Mission</h2>
                <p>
                    To provide the best quality art, woodworks, paintings and other collections as ordered. We ensure that every art bought by the buyer from the site is as it is.
                </p>
                <h2 className='text-center font-bold '>Vision</h2>
                <p>
                    To be a center where artists, innovators and art lovers get to get quality pieces of art. We foster interaction among artists and art buyers to ensure that trust is built and no  buyer loses his collection.
                </p>
                <h2 className='text-center font-bold '>Core Values</h2>
                <p>
                    We ensure integrity is adhered to and no buyer complains about his collection not meeting standards. Honesty is also our mandate and we take complaints from our buyers seriously
                </p>
            </div>
            <div className='h-[450px] w-full'>
                <img src={Images[imageIndex]} alt={`Product ${imageIndex + 1}`}
                className='object-cover w-full h-full '
                />
            </div>
        </div>
    </div>
  )
}

export default About