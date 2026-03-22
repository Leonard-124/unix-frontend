
// import React from 'react'
// import Navbar from '../../../Pages/Navbar'

// const Artpost = () => {
//   return (
//     <div>
//         <Navbar/>
//       <div className='mt-20'>
//         <h1>We create ideas, share work and Motivate through our Art</h1>
//         <form action="" method="post" className='flex flex-col w-1/4'>
//             <label htmlFor="Art" >Art Name:</label>
//             <input type="Art" id='Art' placeholder='Enter Name of Art'/>
//             <label htmlFor="">Seller's Name:</label>
//             <input type="text" placeholder="Enter seller seller's name"/>
//             <label htmlFor="image">Add Art:</label>
//             <input type="file" id='image'/>
//             <label htmlFor="">Valid Price:</label>
//             <input type="Number" placeholder='Enter price in ksh'/>
//             <label htmlFor="">Product description</label>
//             <textarea name="" id="" rows={3} cols={1} placeholder='Description...'></textarea>
//             <button type='submit'>Post</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Artpost

import React, { useState } from 'react'
import Navbar from '../../../Pages/Navbar'

const Artpost = () => {
  const [form, setForm] = useState({
    artName: '',
    seller: '',
    image: null,
    price: '',
    description: ''
  })
   
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setForm({ ...form, image: files[0] })
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null)
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.artName || !form.seller || !form.image || !form.price || !form.description) {
      setError('Please fill in all fields and add an image.')
      setSuccess(false)
      return
    }
    setError('')
    setSuccess(false)

    // Prepare form data for backend
    const formData = new FormData()
    formData.append('artName', form.artName)
    formData.append('seller', form.seller)
    formData.append('image', form.image)
    formData.append('price', form.price)
    formData.append('description', form.description)

    try {
      const res = await fetch('http://localhost:3000/api/artposts', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        setSuccess(true)
        setForm({
          artName: '',
          seller: '',
          image: null,
          price: '',
          description: ''
        })
        setImagePreview(null)
      } else {
        setError('Failed to post art. Try again.')
      }
    } catch (err) {
      setError('Server error. Try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mt-20 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          We create ideas, share work and Motivate through our Art
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg shadow-lg gap-4"
        >
          <label htmlFor="Art" className="font-semibold">Art Name:</label>
          <input
            type="text"
            id="Art"
            name="artName"
            placeholder="Enter Name of Art"
            value={form.artName}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />

          <label htmlFor="seller" className="font-semibold">Seller's Name:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            placeholder="Enter seller's name"
            value={form.seller}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />

          <label htmlFor="image" className="font-semibold">Add Art:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" //
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mt-2 mb-2 self-center"
            />
          )}

          <label htmlFor="price" className="font-semibold">Valid Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price in ksh"
            value={form.price}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            min="0"
          />

          <label htmlFor="description" className="font-semibold">Product Description:</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Description..."
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Art posted successfully!</p>}

          <button
            type="submit"
            className="bg-amber-500 text-white font-semibold py-2 rounded hover:bg-amber-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Artpost

