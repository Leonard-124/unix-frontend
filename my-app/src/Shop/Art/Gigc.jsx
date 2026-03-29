

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Shopnav from '../Shopnav.jsx'
import Footer from '../../Components/Footer.jsx'

const packageDetails = {
  basic: {
    price: "$10",
    quality: "Standard",
    description: "Basic package with essential features."
  },
  premium: {
    price: "$25",
    quality: "High",
    description: "Premium package with extra features and faster delivery."
  },
  deluxe: {
    price: "$50",
    quality: "Top",
    description: "Deluxe package with all features, priority support, and unlimited revisions."
  }
}

const Gigc = () => {
  const [plan, setPlan] = useState('basic')
  const { id } = useParams()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/artposts/${id}`)
        if (!res.ok) throw new Error('Failed to fetch gig')
        const data = await res.json()
        setGig(data)
      } catch (err) {
        setError('Could not load gig details?')
      } finally {
        setLoading(false)
      }
    }
    fetchGig()
  }, [id])

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan)
  }

  if (loading) return <div className="mt-20 text-center">Loading...</div>
  if (error) return <div className="mt-20 text-center text-red-500">{error}</div>
  if (!gig) return null

  return (
    <>
      <Shopnav />
      <div className='flex justify-center mt-20 mb-10'>
        <div className='flex flex-col ml-4 gap-2'>
          <div className='w-1/3'>
            <img src={gig.imageUrl} alt={gig.artName} className="rounded-lg shadow-md" />
          </div>
          <div className='flex justify-between w-1/6 gap-2'>
            <img src={gig.imageUrl} alt={gig.artName} className="w-12 h-12 rounded" />
            <img src={gig.imageUrl} alt={gig.artName} className="w-12 h-12 rounded" />
            <img src={gig.imageUrl} alt={gig.artName} className="w-12 h-12 rounded" />
          </div>
        </div>
        <div className='pr-20 pl-15 w-full'>
          <h1 className='text-2xl font-bold tracking-wide leading-relaxed'>{gig.artName}</h1>
          <p className='text-gray-700'>{gig.seller}</p>
          <p>{gig.description}</p>
          <p> ⭐{gig.rating || 'N/A'}</p>
          <div className='border w-[500px] h-auto border-gray-600 rounded-lg shadow-lg mt-4 bg-white'>
            <p className='border-b tracking-tight text-center font-medium py-2'>Well crafted and designed just for You. 🤗</p>
            <ol className='list-disc pl-5 font-sans leading-relaxed tracking-tight mb-4'>
              <li>The product is delivered the way you want it.</li>
              <li>Delivery time is less than 24 hours</li>
              <li>Our designs are 100% unique and custom-made for you.</li>
              <li>We offer unlimited revisions until you're satisfied.</li>
            </ol>
            <div className='border-t text-center pt-4'>
              <p className='font-semibold mb-2'>Choose your package:</p>
              <div className='flex justify-center gap-4 mb-4'>
                {["basic", "premium", "deluxe"].map(pkg => (
                  <button
                    key={pkg}
                    className={`border px-4 py-2 rounded transition-colors duration-200 ${
                      plan === pkg
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-gray-800 hover:bg-amber-100"
                    }`}
                    onClick={() => handlePlanChange(pkg)}
                  >
                    {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                  </button>
                ))}
              </div>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h2 className="font-bold text-lg mb-2">{plan.charAt(0).toUpperCase() + plan.slice(1)} Package</h2>
                <p><span className="font-semibold">Price:</span> {packageDetails[plan].price}</p>
                <p><span className="font-semibold">Quality:</span> {packageDetails[plan].quality}</p>
                <p><span className="font-semibold">Description:</span> {packageDetails[plan].description}</p>
              </div>
              <Link
                to={`/checkout/${gig._id}?plan=${plan}`}
                className="inline-block bg-amber-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-amber-600 transition-colors"
              >
                Continue to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Gigc;