import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card';
import Carrousel from '../components/Carrousel';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])
  const {id} = useParams();
  const productsList = useSelector(state=>state.products);
  const product = productsList.find(productItem=>productItem.id === Number(id))
  console.log(product);

  const productsCategories = productsList.filter(productItem=> productItem.category.id == product.category.id && productItem.id !== product.id);
  // console.log(productsCategories);

  return (
    <div>
      
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {/* <img src={product.productImgs?.[0]} className="max-w-sm rounded-lg shadow-2xl" /> */}
          <Carrousel arrayImage={product.productImgs}/>
          <div className='	w-4/5 sm:w-1/2'>
            <h1 className="text-5xl font-bold">{product.title}</h1>
            <p className="py-4">{product.description}</p>
            <p className='font-bold py-6'>${product.price}</p>
            <button className="btn btn-primary">Buy now</button>
          </div>
        </div>
      </div>
      <h3>Sugerencias</h3>
      <ul className='flex flex-wrap justify-center gap-3 py-6'>
      {
        productsCategories.map(productItem=>(
          <li>
            <Card product={productItem}/>
            
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default ProductDetails