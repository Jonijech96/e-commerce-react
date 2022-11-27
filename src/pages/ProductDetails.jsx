import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])
  const {id} = useParams();
  const productsList = useSelector(state=>state.products);
  const product = productsList.find(productItem=>productItem.id === Number(id))
  // console.log(product);

  const productsCategories = productsList.filter(productItem=> productItem.category.id == product.category.id && productItem.id !== product.id);
  console.log(productsCategories);

  return (
    <div>
      <h1>ProductDetails</h1>
      <p>{product.title}</p>
      <img src={product.productImgs?.[0]} alt="" />
      <h3>Sugerencias</h3>
      {
        productsCategories.map(productItem=>(
          <li>
            <Link to={`/products/${productItem.id}`}>
            <p>{productItem.title}</p>
            <img src={product.productImgs?.[0]} alt="" height="200px" />
            </Link>
          </li>
        ))
      }
    </div>
  )
}

export default ProductDetails