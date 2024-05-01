import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import {UserContext} from '../context/userContext'

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <h1 className="font-medium">
            Blo<span style={{ color: "red" }}>g</span>
          </h1>
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu" onClick={closeNavHandler}>
            <li>
              <Link to={`/profile/${currentUser.id}`}>{currentUser?.name || "My profile"}</Link>
            </li>
            <li>
              <Link to={`/myposts/${currentUser.id}/`}>My posts</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu" onClick={closeNavHandler}>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
