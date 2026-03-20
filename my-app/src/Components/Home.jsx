
import React from 'react'
import Navbar from '../Pages/Navbar'
import Info from '../Pages/Info'
import Show from '../Pages/Show'
import Available from '../Pages/Available'
import Footer from './Footer'
//import Feedback from '../Pages/Feedback'
import Discover from '../Pages/Discover'
//import Buymecofee from '../Divolved/Buymecofee'
import Message from '../Pages/Message'

const Home = () => {
  return (
    <>
    <Navbar />
    <Info />
    <Message/>
    <Show />
    <Available />
    <Discover />
    <Footer />
    </>
    
  )
}

export default Home
