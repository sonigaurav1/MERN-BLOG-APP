import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  axios.defaults.withCredentials = true;

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const changeInputHandle = (e) => {
    setError(null);
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
      const response = await axios.post(`${API_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      }
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <section className="register">
      <h1 style={{ textAlign: "center" }}>
        {" "}
        <span style={{ letterSpacing: "6px" }}>MERN</span> Blo
        <span style={{ color: "red" }}>g</span> App
      </h1>
      <div style={{ marginTop: "-50px" }} className="container">
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <form className="form register__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={userData.name}
            onChange={changeInputHandle}
            autoFocus
          />
          <input
            type="mail"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={changeInputHandle}
              style={{ paddingRight: "30px" }} // Add padding to accommodate the icon
            />
            {!showPassword && (
              <FaEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "1.3rem"
                }}
              />
            )}
            {showPassword && (
              <FaEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "1.3rem"
                }}
              />
            )}
          </div>

          {error && (
            <p style={{ textAlign: "center" }} className="form__error-message">
              {error}
            </p>
          )}
          <button
            style={{ margin: "0 auto" }}
            type="submit"
            className="btn primary"
          >
            Register
          </button>
        </form>
        <small style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
