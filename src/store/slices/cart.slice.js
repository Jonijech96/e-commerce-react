import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cart = createSlice({
		name: 'cart',
    initialState: [],
    reducers: {
        setcart: (state,action)=>{
          
          return action.payload;
        }
    }
});
export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart',getConfig())
      .then(res => dispatch(setcart(res.data.data.cart.products)))
      .finally(() => dispatch(setIsLoading(false)))
}
export const addCartThunk = (newCart) => (dispatch) => {
  dispatch(setIsLoading(true))
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart',newCart,getConfig())
      .then(res => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)))
}
export const checkOutThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases',{},getConfig())
      .then(res => dispatch(setcart([])))
      .finally(() => dispatch(setIsLoading(false)))
}

export const removeFromCartThunk = (productId) => dispatch => {
      dispatch(setIsLoading(true));
      return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${productId}`, getConfig())
          .then(() => dispatch(getCartThunk()))
          .finally(() => setIsLoading(false));
  }


export const {  setcart } = cart.actions;

export default cart.reducer;