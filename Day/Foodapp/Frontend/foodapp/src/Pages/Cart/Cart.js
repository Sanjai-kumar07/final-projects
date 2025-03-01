import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart,url,handlePromoSubmit,promoCode, setPromoCode,promoDiscount,getTotalCartAmount} = useContext(StoreContext);

  const navigate =useNavigate();
  
  const deliveryFee = 50;
  const Subtotal = getTotalCartAmount();
  const total = Math.max(Number(Subtotal) + Number(deliveryFee) - Number(promoDiscount || 0))
 

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list?.map((item, index) => (
          cartItems[item._id] > 0 && (
            <div>
              <div className='cart-items-title cart-items-item' key={index}>
                <img src={url+"/images/"+item.image} alt='pic1' />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <button><p onClick={() => removeFromCart(item._id)} className='cross'>Delete</p></button>
              </div>
              <hr/>
            </div>

          )
        ))}

      </div>
      <div className='cart-bottom'>
  <div className='cart-total'>
    <h2>Cart Totals</h2>
    <div>
      <div className='cart-total-details'>
        <p>Subtotal</p>
        <p>${Subtotal ? Subtotal.toFixed(2) : "0.00"}</p>
      </div>
      <hr />
      <div className='cart-total-details'>
        <p>Delivery Fee</p>
        <p>${deliveryFee ? deliveryFee.toFixed(2) : "0.00"}</p>
      </div>
      <hr />
      {promoDiscount > 0 && (
        <div className='cart-total-details'>
          <p>Promo Discount</p>
          <p>-${Number(promoDiscount).toFixed(2)}</p>
        </div>
      )}
      <hr/>
      <div className='cart-total-details'>
        <b>Total</b>
        <b>${total.toFixed(2)}</b>
      </div> 
    </div>
    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
  </div>
  <div className='cart-promocode'>
    <p>If you have a promo code, Enter it here</p>
    <form className='cart-promocode-input' onSubmit={handlePromoSubmit}>
      <input 
        onChange={(e) => setPromoCode(e.target.value)} 
        value={promoCode} 
        type='text' 
        placeholder='Promo Code Optional' 
        required
      />
      <button type='submit'>Submit</button>
    </form>
  </div>
</div>
    </div>

  )
}

export default Cart

