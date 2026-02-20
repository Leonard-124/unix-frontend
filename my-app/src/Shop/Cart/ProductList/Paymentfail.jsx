

import React from 'react'
import { Link } from 'react-router-dom';

const Paymentfail = () => {
  return (
    <div>
            <div className='mt-20 text-center m-5'>
        <h1 className='text-2xl font-[700] leading-0.5 tracking-[1px] text-shadow-neutral-800 font-mono text-center m-3'>Payment Failed</h1>
        <h1>There is a problem with the server. Please be patient. If you have made payment contact our customer care.</h1>
       <h1 className='m-5'><Link to="/Shop" className='text-center underline text-blue-700 text-xl'>Continue to shop</Link></h1>
       
     </div>
    </div>
  )
}

export default Paymentfail;
