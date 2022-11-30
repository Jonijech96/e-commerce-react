import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice';

const Cart = () => {
  const dispatch = useDispatch();
  let priceTotal = 0;

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])
  const cart = useSelector(state=>state.cart);
  return (  
    <div>
      Cart
    { cart.lenght ? (

      cart.map(cartItem=>(
        <li>
         <p>{cartItem.title}</p>
         <p>quantity: {cartItem.productsInCart.quantity}</p>
         <p>price c/u: {cartItem.price}</p>
         <p>subtotal: {priceTotal +=  Number(cartItem.price) * cartItem.productsInCart.quantity}</p>
        </li>
      ))
    ) : <p>no hay productos en el carrito</p>
    }
    </div>
    
  )
}

export default Cart