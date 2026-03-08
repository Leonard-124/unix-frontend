import { useContext } from 'react'
import React from 'react'
import { CartContext } from '../../Context/Context'


const Collectionlist = () => {
    const {
        cart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getTotalItems
    } = useContext(CartContext)

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartQuantity(itemId, newQuantity)
    }
  return (
    <div>
        <div className='flex justify-evenly items-center font-[500] text-[19px] tracking-[1px] mt-20'>
        <div>Favorite collections</div>
        <div>Title</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Remove</div>
        </div>
        {cart.length === 0 ? (
            <div>Your collections are empty?</div>
        ) : (
            cart.map((item) => (
                <div key={item._id || item.id} className='flex justify-evenly items-center border-b py-4'>
                    <div className='flex items-center'>
                        <img src={item.imageUrl ||  item.image} alt={item.name} className='w-12 h-12 object-cover mr-4'/>
                        <span>{item.name}</span>
                    </div>
                </div>
            ))
        )}
    </div>
  )
}

export default Collectionlist
