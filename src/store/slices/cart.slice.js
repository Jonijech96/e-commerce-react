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

export const {  setcart } = cart.actions;

export default cart.reducer;