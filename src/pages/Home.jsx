import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
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
  // console.log(categoriesProduct);
  return (
    <div>
      
      <div className="tabs tabs-boxed">
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
            <Card product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
