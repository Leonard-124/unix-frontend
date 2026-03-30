
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
    <div className='mt-28 px-4 sm:px-6 lg:px-12' id='about'>
        <h1 className='text-center text-2xl sm:text-3xl font-bold mb-10'>About Us</h1>
        <div className=' flex justify-between font-light text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed'>
            <div>
                <p className="font-light tracking-[-1px] text-[16px]">
                    UnixArt is a curated marketplace dedicated to the preservation and promotion of exceptional artistry. We specialize in sourcing authentic woodworks, bespoke paintings, and rare collectibles that celebrate craftsmanship and cultural heritage. Beyond being a gallery, UnixArt is a global bridge connecting visionary artists and innovators with discerning collectors. When you acquire a piece from us, you aren’t just buying art; you are investing in a story that we ensure reaches your doorstep with the utmost care and precision.
                </p>
                <h2 className='text-center font-bold '>Mission</h2>
                <p>
                    Our mission is to provide a seamless gateway to high-quality, authentic art and woodwork. We are committed to transparency, ensuring that every piece delivered is a true reflection of the artisan’s vision and the collector’s expectations. By prioritizing reliability and craftsmanship, we turn every purchase into a lasting legacy.
                </p>
                <h2 className='text-center font-bold '>Vision</h2>
                <p>
                    To become the premier global hub where art lovers, innovators, and creators converge. We strive to build an ecosystem of trust—fostering a community where the integrity of the art is matched only by the strength of the relationship between the creator and the collector.
                </p>
                <h2 className='text-center font-bold '>Core Values</h2>
                <p className='font-light tracking-[-1px] text-[16px]'>
                <p>
                    <span className="font-bold text-[19px] tracking-[1px]">Artisanal Excellence:</span>
                     We champion the skill of the human hand, prioritizing unique, high-quality woodworks and paintings.
                </p>
                <p>
                    <span className="font-bold text-[19px] tracking-[1px]">Uncompromising Integrity:</span>
                    We hold our collection to the highest standards, ensuring that what you see is exactly what you receive.
                </p>
                <p>
                    <span className="font-bold text-[19px] tracking-[1px]">Radical Honesty: </span>
                    Trust is our currency. We maintain open, transparent communication with our buyers and handle every inquiry with the seriousness it deserves.
                </p>
                <p>
                    <span className="font-bold text-[19px] tracking-[1px]">Community Centricity:</span>
                    We believe art thrives in a community. We are dedicated to supporting the livelihoods of the artists and innovators we represent.
                </p>
                </p>
            </div>
            <div className='h-[450px] w-full sm:w-[250px] w-auto'>
                <img src={Images[imageIndex]} alt={`Product ${imageIndex + 1}`}
                className='object-cover w-full h-full '
                />
            </div>
        </div>
    </div>
  )
}

export default About