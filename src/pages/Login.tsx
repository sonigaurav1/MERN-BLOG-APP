import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { UserContext } from "../context/userContext";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const API_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
      const response = await axios.post<UserData>(`${API_URL}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data.message);
    }
  }

  return (
    <>
      <section className="login">
        <h1 style={{ textAlign: "center" }}>
          {" "}
          <span style={{ letterSpacing: "6px" }}>MERN</span> Blo
          <span style={{ color: "red" }}>g</span> App
        </h1>
        <div style={{ marginTop: "-150px" }} className="container">
          <h2 style={{ textAlign: "center" }}>Sign In</h2>
          <form className="form login__form" onSubmit={handleSubmit}>
            <input
              type="mail"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={changeInputHandle}
              autoFocus
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
                    fontSize: "1.3rem",
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
                    fontSize: "1.3rem",
                  }}
                />
              )}
            </div>
            {error && (
              <p
                style={{ textAlign: "center" }}
                className="form__error-message"
              >
                {error}
              </p>
            )}
            <button
              style={{ marginInline: "auto", width: "6rem", marginTop: "1rem" }}
              type="submit"
              className="btn primary"
            >
              Login
            </button>
          </form>
          <small style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/register">sign Up</Link>
          </small>
        </div>
      </section>
    </>
  );
};

export default Login;
