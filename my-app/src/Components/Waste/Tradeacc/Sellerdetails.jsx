

import React, { useState, useEffect } from 'react'

const initialForm = {
  name: '',
  oldPrice: '',
  newPrice: '',
  category: '',
  image: null,
  description: ''
}

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

const Sellerdetails = () => {
  const [view, setView] = useState('add')
  const [form, setForm] = useState(initialForm)
  const [products, setProducts] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (view === 'list') {
      fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(() => setError('Failed to load products'))
    }
  }, [view, success])

  const handleChange = e => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      const file = files[0]
      if (file) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed.')
          setForm({ ...form, image: null })
          setImagePreview(null)
          return
        }
        if (file.size > MAX_FILE_SIZE) {
          setError('Image file too large. Max size is 2MB.')
          setForm({ ...form, image: null })
          setImagePreview(null)
          return
        }
        setError('')
        setForm({ ...form, image: file })
        setImagePreview(URL.createObjectURL(file))
      } else {
        setForm({ ...form, image: null })
        setImagePreview(null)
      }
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.name || !form.oldPrice || !form.newPrice || !form.category || !form.image || !form.description) {
      setError('Please fill all fields and add an image.')
      return
    }
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('oldPrice', form.oldPrice)
    formData.append('newPrice', form.newPrice)
    formData.append('category', form.category)
    formData.append('image', form.image)
    formData.append('description', form.description)

    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess('Product added successfully!')
        setForm(initialForm)
        setImagePreview(null)
      } else {
        setError(data.error || 'Failed to add product.')
      }
    } catch {
      setError('Server error.')
    }
  }

  const handleRemove = async id => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setSuccess('Product removed.')
        setProducts(products.filter(p => p._id !== id))
      } else {
        setError('Failed to remove product.')
      }
    } catch {
      setError('Server error.')
    }
  }

  return (
    <div className='mt-20'>
      <div className='flex justify-start'>
        <div className='flex flex-col bg-gray-400 mr-2 ml-1 w-[300px] h-[700px]'>
          <button
            className={`bg-gray-300 m-10 p-3 rounded shadow font-[500] tracking-[1px] cursor-pointer ${view === 'add' ? 'border-2 border-blue-700' : ''}`}
            onClick={() => setView('add')}
          >
            AddProduct
          </button>
          <button
            className={`bg-gray-300 m-10 p-3 rounded shadow font-[500] tracking-[1px] cursor-pointer ${view === 'list' ? 'border-2 border-blue-700' : ''}`}
            onClick={() => setView('list')}
          >
            ProductList
          </button>
        </div>
        <div className='text-center flex flex-col'>
          <h1 className='tracking-[-1px] text-lime-950 mb-4'>Welcome to Unix Sellers where we value your commitment as our esteemed seller.🤗</h1>
          {view === 'add' && (
            <form
              className='w-[600px] h-auto bg-slate-50 shadow rounded p-4 flex flex-col gap-2'
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id='name'
                name='name'
                placeholder='Enter product name'
                value={form.name}
                onChange={handleChange}
                className='block w-full m-1 border rounded px-2 py-1'
              />
              <label htmlFor="oldPrice">Price:</label>
              <input
                type="number"
                id='oldPrice'
                name='oldPrice'
                placeholder='Enter here'
                value={form.oldPrice}
                onChange={handleChange}
                className='block w-full m-1 border rounded px-2 py-1'
              />
              <label htmlFor="newPrice">New Price:</label>
              <input
                type="number"
                id='newPrice'
                name='newPrice'
                placeholder='Enter here'
                value={form.newPrice}
                onChange={handleChange}
                className='block w-full m-1 border rounded px-2 py-1'
              />
              <label htmlFor="category" className='block'>Product category:</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="block w-full m-1 border rounded px-2 py-1"
              >
                <option value="">-- Select a category --</option>
                <option value="phones">Phones</option>
                <option value="crockery">Crockery</option>
                <option value="foods">Foods</option>
                <option value="clothing">Clothing</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="machines">Machines</option>
                <option value="drinks">Drinks</option>
                <option value="others">Others</option>
              </select>
              <label htmlFor="image">Product Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block w-full m-1"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded self-center mb-2" />
              )}
              <label htmlFor="description">Product Description:</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder='Description...'
                value={form.description}
                onChange={handleChange}
                className='block w-full m-1 border rounded px-2 py-1'
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}
              <button type='submit' className='bg-blue-700 p-2 rounded shadow block text-white font-semibold'>Add Item</button>
            </form>
          )}
          {view === 'list' && (
            <div className='m-2 w-[600px] bg-white shadow rounded p-4'>
              <h1 className='text-xl font-bold mb-2'>All Product List</h1>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Products</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Offer Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-4">No products found.</td>
                    </tr>
                  )}
                  {products.map(product => (
                    <tr key={product._id} className="border-b">
                      <td>
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td>{product.name}</td>
                      <td>Ksh {product.oldPrice}</td>
                      <td>Ksh {product.newPrice}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleRemove(product._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sellerdetails

