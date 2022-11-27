import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { filterHeadlineThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
useEffect(() => {
  axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
  .then(res=>setCategoriesProduct(res.data.data.categories));

  
}, [])

  const products = useSelector(state=>state.products)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])
  console.log(categoriesProduct);
  return (
    <div>
      <h1>Home Products</h1>
      <h3>categories</h3>
      {
        categoriesProduct.map(category=>(
          <button onClick={()=>dispatch(filterProductsThunk(category.id))}>{category.name}</button>
        ))
      }
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputSearch}
          onChange={(e)=>setInputSearch(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={()=>dispatch(filterHeadlineThunk(inputSearch))}>
          Button
        </Button>
      </InputGroup>
      <ul>
      {
        products.map(product=>(
          <li>
            
            <Link to={`/products/${product.id}`}>
              <p>{product.title}
              <img src={product.productImgs?.[0]} alt="" width="200px" />

              </p></Link>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default Home