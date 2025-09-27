


import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../Pages/Navbar'

const Cardo = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`https://unix.up.railway.app/api/art/${id}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()
        setItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArt()
  }, [id])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error}</h1>
  if (!item) return <h1>Item not found</h1>

  return (
    <>
      <Navbar />
      <div className='mt-24'>
        <div className='flex max-h-[400px] '>
          <div className='w-full h-96 m-4'>
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-full object-cover'
            />
            <div className='flex text-sm gap-3'>
              <p>Likes ❤️</p>
              <Link to="/">View in room</Link>
              <Link to="/">Share</Link>
            </div>
            <p>About the Art</p>
            <p className='font-mono text-xl tracking-[1px]'>
              {item.description}
            </p>
          </div>
          <div className='w-full flex flex-col gap-8 text-center'>
            <p className='font-light text-black text-xl'>{item.name}</p>
            <p className='text-2xl text-gray-500 '>By {item.inventor}</p>
            <p className='text-xl text-gray font-mono'>Size: {item.size}</p>
            <p className='text-xl text-gray font-mono'>Price: {item.price}</p>
            <Link
              to={`/artworkscard/${item._id}`}
              className='text-white bg-black rounded p-4 text-xl mr-5 ml-5 hover:bg-[#535353]'
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cardo