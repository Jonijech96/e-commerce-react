import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import {
  filterHeadlineThunk,
  filterPrice,
  filterPriceThunk,
  filterProductsThunk,
  getProductsThunk,
  setProducts,
} from "../store/slices/products.slice";

const Home = () => {
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState(0);
  const [inputRange, setInputRange] = useState(3000);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

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
  const filterPriceNew = ({ fromPrice, toPrice }) => {
    // const newFilterArray = products.filter(
    //   (product) =>
    //     product.price > Number(fromPrice) && product.price < Number(toPrice)
    // );
    if (categorySelected == 0) {
      dispatch(getProductsThunk());
      dispatch(setProducts({ fromPrice, toPrice }));
    } else {
      dispatch(filterProductsThunk(categorySelected));
      dispatch(setProducts({ fromPrice, toPrice }));
    }
  };

  return (
    <div className="pb-5 bg-base-200">
      <div className="form-control py-8">
        <div className="input-group justify-center">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered w-2/3 max-w-md"
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
      <div className="flex justify-center gap-4">
        <div className="form-control w-60 ">
          <div className="categories py-4">
            <p className="font-semibold text-center pb-4">Categories</p>
            <div className="flex tabs-boxed flex-col gap-4 ">
              {categoriesProduct.map((category) => (
                <button
                  className={`tab ${
                    category.id == categorySelected && "tab-active"
                  }`}
                  onClick={() => {
                    dispatch(filterProductsThunk(category.id));
                    setCategorySelected(category.id);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <p className="font-semibold text-center pb-4">Prices</p>

          <label className="input-group gap-4 pb-4">
            <div className="input-content">
              <label className="label">
                <span className="label-text">from</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={fromPrice}
                onChange={(e) => setFromPrice(e.target.value)}
              />
            </div>
            <div className="input-content">
              <label className="label">
                <span className="label-text">to</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={toPrice}
                onChange={(e) => setToPrice(e.target.value)}
              />
            </div>
          </label>
          <button
            className="btn btn-ghost"
            onClick={() => dispatch(filterPrice({ fromPrice, toPrice }))}
          >
            filter Price
          </button>
        </div>

        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl  ">
          {products.map((product) => (
            <li>
              <Card product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
