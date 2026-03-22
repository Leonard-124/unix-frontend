

import React, {useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Form = () => {
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
      username: "",
      phone: Number,
      address: "",
      country: "",
      city: "",
      postalCode: "",
    })

    const handleSubmit = async(e) => {
    e.preventDefault()
    // if (!form.address || !form.city || !form.country || !form.phone || !form.username || !form.postalCode) {
    //   setError("All fields are required to continue with payment!")
    //   setSuccess(false)
    //   return
    // }
    // setError("")
    // setSuccess(false)

    const formData = new FormData()
    formData.append("username", form.username)
    formData.append("phone", form.phone)
    formData.append("address", form.address)
    formData.append("country", form.country)
    formData.append("city", form.city)
    formData.append("postalCode", form.postalCode)

    try{
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      const res = await fetch("http://localhost:3000/personal_details",{
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`},
      body: formData
    })
    if(res.ok) 
    setSuccess(true)
    setForm({
      username: form.username,
      phone: form.phone,
      address: form.address,
      country: form.country,
      city: form.city,
      postalCode: form.postalCode
    })

    } catch (err) {
      setError("Error sending your payment details...")
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSubmit()
  },[])


  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='username...'
              onChange={(e)=> setForm(e.target.value)}
              value={form.username}
              />
              <input type="phone"
              placeholder='Enter phone no.'
              onChange={(e) => setForm(e.target.value)}
              value={form.phone}
              />
            </div>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='Enter your local address...'
              onChange={(e) => setForm(e.target.value)}
              value={form.address}
              />
              <input type="text"
              placeholder='Postal code / Zip code'
              onChange={(e) => setForm(e.target.value)}
              value={form.postalCode}
              />
            </div>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='Enter country of residence'
              onChange={(e) => setForm(e.target.value)}
              value={form.country}
              />
              <input type="text"
              placeholder='Enter your current city / region'
              onChange={(e) => setForm(e.target.value)}
              value={form.city}
              />
            </div>
            
          </div>
          {error ? <p className='text-red-500 text-sm'>{error}</p> : null}
          {success && <p className='text-green-300 font-light text-sm'>Payment details set successfully</p>}
          <button type="submit" className='bg-[#d8d7d7] text-[#332f75]'>{success ? <p className=''>Sent</p> : <p>Send</p>}</button>
        </form>
    </div>
  )
}

export default Form

/////////////////////////////////////////////////////////////////
// const handleChange = (e) => {
//   const {name, type, files, value} = e.target;
//   if (type === "file") {
//     setForm({...form, image: files[0]})
//     setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null)
//   } else {
//     setForm({...form, [name] : value})
//   }
// }

// const logout = () => {
//   const navigate = useNavigate()
//   useEffect(() => {
//     localStorage.removeItem("token")
//     navigate("/login")
//   },[navigate])
//   return null
// }

{/* <span>{t.type === "error" ? "✗" : t.type === "warn" ? "⚠" : "✓"}</span> */}

{/* <Btn onClick={() => { onClose(); onEdit(item); }}></Btn> */}

        // const token = await getAccessTokenSilently();

        // // 1. Sync user with backend
        // await axios.post(
        //   `${import.meta.env.VITE_API_BASE_URL}/api/users/users`,
        //   {
        //     auth0Id: user.sub,
        //     email: user.email,
        //     username: user.nickname,
        //   },
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );




  // const copyShareLink = () => {
  //   if (!shareUrl) {
  //     alert("Please set a username first to get your shareable link");
  //     return;
  //   }
  //   navigator.clipboard.writeText(shareUrl);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };