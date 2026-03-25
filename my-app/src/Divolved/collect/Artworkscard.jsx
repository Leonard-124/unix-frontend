
import React, { useEffect, useState } from 'react'
import Navbar from '../../Pages/Navbar'
import { useParams, Link } from 'react-router-dom'

const Artworkscard = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCollectible = async () => {
      try {
        const res = await fetch(`https://unix.up.railway.app/api/art/${id}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const result = await res.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCollectible()
  }, [id])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error}</h1>
  if (!data) return <h1>Collectible Not Found</h1>

  // Ensure price is numeric for calculations
  const numericPrice = Number(String(data.price).replace("$", ""))
  const fee = 0.05 * numericPrice
  const total = fee + numericPrice

  return (
    <>
      <Navbar />
      <div className='mt-24'>
        <div>
          <p className='text-center text-xl font-bold tracking-tight'>Order details:</p>
          <div className='mt-5'>
            <hr />
            <div className='flex justify-between mb-5 pb-5 m-1'>
              <div>
                <p>Price</p>
                <p className='text-xl text-gray-600 font-mono'>{data.price}</p>
              </div>
              <div>
                <p>Size</p>
                <p>{data.size}</p>
              </div>
              <div className='w-[200px] h-[200px]'>
                <p>Item</p>
                <img
                  src={data.image}
                  alt={data.name}
                  className='w-full h-full object-cover m-1'
                />
              </div>
            </div>
            <hr />
            <div className='flex flex-col gap-2 mb-2'>
              <p className='text-gray-500'>Subtotal: {data.price}</p>
              <p className='text-gray-500'>Delivery fee ${fee.toFixed(2)}</p>
              <p className='text-gray-500'>Price to pay: ${total.toFixed(2)}</p>
            </div>
            <div>
              <Link
                to={`/paystack-redirect/?id=${id}`} //condition for multiple IDs
                className='bg-red-500 text-white py-2 px-4 rounded m-2 hover:bg-red-400'
              >
                Check out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Artworkscard
