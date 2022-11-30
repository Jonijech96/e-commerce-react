import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { getCartThunk } from "../store/slices/cart.slice";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  const cart = useSelector(state=>state.cart);
  console.log(cart);
  
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Ecommerce
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/purchases">Purchases</Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cart.length} Items</span>
                {/* <span className="text-info">Subtotal: $0</span> */}
                <div className="card-actions">
                {cart.length ? (
                <button onClick={()=>setIsDrawerOpen(!isDrawerOpen)}  className="btn btn-primary btn-block">View cart</button>
                ) : (
                <button onClick={()=>setIsDrawerOpen(!isDrawerOpen)} disabled  className="btn btn-primary btn-block">View cart</button>

                )

                }
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar show={isDrawerOpen} setShow={setIsDrawerOpen}/>
    </>
  );
};

export default NavBar;
