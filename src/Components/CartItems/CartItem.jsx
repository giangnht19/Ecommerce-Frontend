import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
    const {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
  return (
    <div className='cart-item'>
      <div className="cart-item-format-main">
        <p>Product</p>
        <p className='cart-item-name'>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Add</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item) => {
          if (cartItems[item.id] > 0) 
            {
            return <div>
                        <div className="cart-item-format cart-item-format-main">
                            <img src={item.image} alt="" className='carticon-product-icon' />
                            <p className='cart-item-name'>{item.name}</p>
                            <p>${item.new_price}</p>
                            <p className='cart-item-quantity'>{cartItems[item.id]}</p>
                            <p>${item.new_price*cartItems[item.id]}</p>
                            <img className='cart-item-add-icon' src={remove_icon} onClick={() => {addToCart(item.id)}} alt="" />
                            <img className='cart-item-remove-icon' src={remove_icon} onClick={() => {removeFromCart(item.id)}} alt="" />
                        </div>
                        <hr />
                    </div>
          }
          else {
            return null
          }
      })}
      <div className="cart-item-down">
        <div className="cart-item-total">
            <h1>CART TOTALS</h1>
            <div>
                <div className="cart-item-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-item-total-item">
                    <p>Shipping Free</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cart-item-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-item-promocode'>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-item-promobox">
                <input type="text" placeholder='Enter Promocode' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
