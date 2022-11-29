import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    const url = "https://e-commerce-api.academlo.tech/api/v1/users/login";
    axios
      .post(url, data)
      .then((res) => {
        navigate("/");
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("credenciales incorrectas");
        } else {
          console.log(error.response.data);
        }
      });
    // console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div className="form-control">
          <label className="input-group">
            <span>
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </span>

            <input
              type="email"
              placeholder="info@site.com"
              className="input input-bordered"
              {...register("email")}
            />
          </label>
          <label className="input-group">
            <span>
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
          </label>
        </div>
        <button className="btn">enviar</button>
      </form>
    </div>
  );
};

export default Login;
