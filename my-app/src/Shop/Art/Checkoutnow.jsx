
// import React from 'react'
// import { useParams, useLocation } from 'react-router-dom'
// import gigs from "../../assets/gigs.js"
// import Shopnav from '../Shopnav.jsx'
// import Footer from '../../Components/Footer.jsx'

// const packageDetails = {
//   basic: {
//     price: "$10",
//     quality: "Standard",
//     description: "Basic package with essential features."
//   },
//   premium: {
//     price: "$25",
//     quality: "High",
//     description: "Premium package with extra features and faster delivery."
//   },
//   deluxe: {
//     price: "$50",
//     quality: "Top",
//     description: "Deluxe package with all features, priority support, and unlimited revisions."
//   }
// }

// function useQuery() {
//   return new URLSearchParams(useLocation().search)
// }

// const Checkoutnow = () => {
//   const { id } = useParams()
//   const query = useQuery()
//   const plan = query.get('plan') || 'basic'
//   const gig = gigs.find(g => g.id === parseInt(id))   

//   return (
//     <>
//       <Shopnav />
//       <div className="flex flex-col items-center mt-20 mb-10">
//         <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//           <div className="mb-6">
//             <img src={gig.image} alt={gig.title} className="w-32 h-32 object-cover rounded mb-2" />
//             <h2 className="text-xl font-semibold">{gig.title}</h2>
//             <p className="text-gray-700">{gig.seller}</p>
//             <p>{gig.description}</p>
//             <p>⭐ {gig.rating}</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded mb-6">
//             <h3 className="font-bold text-lg mb-2">{plan.charAt(0).toUpperCase() + plan.slice(1)} Package</h3>
//             <p><span className="font-semibold">Price:</span> {packageDetails[plan].price}</p>
//             <p><span className="font-semibold">Quality:</span> {packageDetails[plan].quality}</p>
//             <p><span className="font-semibold">Description:</span> {packageDetails[plan].description}</p>
//           </div>
//           <button className="w-full bg-amber-500 text-white font-semibold px-6 py-3 rounded shadow hover:bg-amber-600 transition-colors">
//             Place Order
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Checkoutnow;