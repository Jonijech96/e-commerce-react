import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const products = createSlice({
		name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state,action)=>{
          
          return action.payload;
        }
    }
});
export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  return axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
      .then(res => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)))
}
export const filterProductsThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
      .then(res => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)))
}
export const filterHeadlineThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?query=${id}`)
      .then(res => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)))
}
export const {  setProducts } = products.actions;

export default products.reducer;