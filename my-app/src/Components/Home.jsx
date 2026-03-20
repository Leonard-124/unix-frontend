
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
import About from '../Pages/About'
import Testimony from '../Pages/Testimony'

const Home = () => {
  return (
    <>
    <Navbar />
    <Info/>
    <Message/>
    <About/>
    <Available />
    <Testimony />
    <Show/>
    <Discover />
    <Footer />
    </>
    
  )
}

export default Home
