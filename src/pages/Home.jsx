import React from 'react'
import { useDispatch } from 'react-redux'
import { getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])
  return (
    <div>Home</div>
  )
}

export default Home