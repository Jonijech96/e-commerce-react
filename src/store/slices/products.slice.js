import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';

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
      .then(res => dispatch(setProducts(res.data)))
      .finally(() => dispatch(setIsLoading(false)))
}
export const {  setProducts } = products.actions;

export default products.reducer;