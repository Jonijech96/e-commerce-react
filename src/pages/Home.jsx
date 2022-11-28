import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterHeadlineThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesProduct(res.data.data.categories));
  }, []);

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  console.log(categoriesProduct);
  return (
    <div>
      <h1>Home Products</h1>
      <h3>categories</h3>
      <div className="tabs tabs-boxed">
        {/* <a className="tab">Tab 1</a> 
        <a className="tab tab-active">Tab 2</a> 
        <a className="tab">Tab 3</a> */}
        {categoriesProduct.map((category) => (
          <button
            className={`tab ${category.id == categorySelected && "tab-active"}`}
            onClick={() => {
              dispatch(filterProductsThunk(category.id));
              setCategorySelected(category.id);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <button
            className="btn btn-square"
            onClick={() => dispatch(filterHeadlineThunk(inputSearch))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-3 max-w-screen-2xl mx-auto ">
        {products.map((product) => (
          <li>
            <Link to={`/products/${product.id}`}>
              {/* <p>
                {product.title}
                <img src={product.productImgs?.[0]} alt="" width="200px" />
              </p> */}
              <div className="card w-96 bg-base-100 shadow-xl divide-y">
                <figure className="h-64">
                  <img
                    src={product.productImgs?.[0]}
                    alt="Shoes"
                    // width="50px"
                    // height="100%"
                    className="h-4/5	"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <span className="text-slate-500">Price</span>
                  <p className="font-bold">${product.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
