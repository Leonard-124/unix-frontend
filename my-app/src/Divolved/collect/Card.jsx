import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../Pages/Navbar'
import BaseUrl from '../../utils/BaseUrl'

const Card = () => {
  const { id } = useParams()
  const [inventionItem, setInventionItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`${BaseUrl()}/api/art/${id}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()
        setInventionItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArt()
  }, [id])

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-2xl font-bold text-black'>Loading...</p>
        </div>
      </div>
    )
  if (error)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-2xl font-bold text-red-500'>{error}</p>
        </div>
      </div>
    )
  if (!inventionItem)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-2xl font-bold text-black'>Item not found</p>
        </div>
      </div>
    )

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-white pt-32 pb-20'>
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Left Column - Image & Actions */}
            <div className='flex flex-col gap-8'>
              {/* Image Container */}
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <img
                  src={inventionItem.image}
                  alt={inventionItem.name}
                  className='w-full h-96 sm:h-[500px] object-cover'
                />
              </div>

              {/* Action Buttons */}
              <div className='flex flex-wrap gap-3'>
                <button className='px-6 py-3 bg-white border-2 border-black text-black rounded font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300'>
                  ❤️ Like
                </button>
                <Link
                  to='/'
                  className='px-6 py-3 bg-white border-2 border-black text-black rounded font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300 text-center'
                >
                  View in room
                </Link>
                <Link
                  to='/'
                  className='px-6 py-3 bg-white border-2 border-black text-black rounded font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300 text-center'
                >
                  Share
                </Link>
              </div>

              {/* About Section */}
              <div className='bg-white border-l-4 border-red-500 pl-6 pr-4 py-6 rounded shadow-sm'>
                <h3 className='text-lg font-bold text-black mb-4 uppercase tracking-wide'>
                  About the Art
                </h3>
                <p className='font-mono text-base text-black leading-relaxed'>
                  {inventionItem.description}
                </p>
              </div>
            </div>

            {/* Right Column - Details & CTA */}
            <div className='flex flex-col justify-between gap-8'>
              {/* Title Section */}
              <div>
                <h1 className='text-4xl sm:text-5xl font-bold text-black mb-2'>
                  {inventionItem.name}
                </h1>
                <div className='h-1 w-16 bg-red-500'></div>
              </div>

              {/* Details Container */}
              <div className='space-y-8'>
                {/* Artist */}
                <div className='border-b-2 border-black pb-6'>
                  <p className='text-xs font-bold text-black uppercase tracking-widest mb-2'>
                    Inventor
                  </p>
                  <p className='text-2xl font-bold text-black'>
                    {inventionItem.inventor}
                  </p>
                </div>

                {/* Size */}
                <div className='border-b-2 border-black pb-6'>
                  <p className='text-xs font-bold text-black uppercase tracking-widest mb-2'>
                    Dimensions
                  </p>
                  <p className='text-xl font-mono text-black'>{inventionItem.size}</p>
                </div>

                {/* Price */}
                <div className='border-b-2 border-black pb-6'>
                  <p className='text-xs font-bold text-black uppercase tracking-widest mb-2'>
                    Price
                  </p>
                  <p className='text-4xl font-bold text-red-500'>
                    {inventionItem.price}
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className='space-y-4 mt-4'>
                {/* Buy Button */}
                <Link
                  to={`/invention/${inventionItem._id}`}
                  className='w-full bg-red-500 text-white text-lg font-bold py-4 px-6 rounded hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-center block'
                >
                  Buy Now
                </Link>

                {/* Info Banner */}
                <div className='bg-black text-white py-3 px-4 rounded text-center text-sm font-medium'>
                  <p>🚚 Free shipping on orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card