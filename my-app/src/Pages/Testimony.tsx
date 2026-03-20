
import React from 'react'

const Testimony = () => {
  return (
    <div>
        <h2 className='text-center text-2xl sm:text-3xl font-bold mb-10'>Testimonials</h2>
        <div className='flex justify-between font-light text-gray-800 space-y-2 sm:text-base leading-relaxed'>
            <div>
                <p>'I bought an art at UnixArt I have to say that I admire how it was delivered, The art was also as inquired' </p>
                <p>David Muller - Buyer</p>
            </div>
            <div>
                <p>'I am proud of what I got, the art itself was unique reminding me of my greatest lost connections, I highly recommend it.</p>
                <p>Anna Charlotte - Collector</p>
            </div>
            <div>
                <p>I am proud of being part of UnixArt community, it has fostered my connections and I met several artists through this plartform</p>
                <p>Malcom Watts - Artist</p>
            </div>
        </div>
    </div>
  )
}

export default Testimony;