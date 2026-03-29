

import { Link } from 'react-router-dom'
import Cart_icon from '../assets/images/shopping-cart.png'
import { useContext } from 'react';
import { CartContext, SearchContext } from '../Context/Context';



const Shopnav = () => {
  const { cart } = useContext(CartContext);

  const { search, setSearch } = useContext(SearchContext)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='fixed top-0 left-0 right-0 z-50 mb-3 bg-white'>
          <div className=' flex justify-between max-h-60 items-center mt-4'>
      <div className='ml-8 '>
        <span className='text-5xl tracking-[3px]  '>UnIxArt</span>
        </div>
      <div>
        <input
         type="text"
         value={search}
         onChange={e => setSearch(e.target.value)}
         placeholder='search' 
         className='border-[1px] text[20px] rounded h-[30px] w-[220px]'/>
      </div>
      <div className='mr-9 flex gap-5 text-[35px] font-[100] tracking-[-2.4px] '>
        <Link to="/">Home</Link>
        <Link to="/Categories">Categories</Link>
        {/* <Link to="/Art">Deals Art</Link> */}
        <Link to="/Cart" className='relative '>{<img src={Cart_icon} alt="Cart" height={40} width={40}  className='relative'/>}
        <span className='absolute top-0 right-[-6px] bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center text-[12px] font-[500] tracking-[0.5px] p-0.5'>{cartCount}</span>
        </Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Shopnav
