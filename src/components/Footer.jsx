import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li>
          <Link
            style={{ color: "green", outline: "1.5px solid green" }}
            to="/posts/categories/Agriculture"
          >
            Agriculture
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#000", outline: "1.5px solid #000" }}
            to="/posts/categories/Business"
          >
            Business
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#8bc34a", outline: "1.5px solid #8bc34a" }}
            to="/posts/categories/Education"
          >
            Education
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#e53935", outline: "1.5px solid #e53935" }}
            to="/posts/categories/Entertainment"
          >
            Entertainment
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#00bcd4", outline: "1.5px solid #00bcd4" }}
            to="/posts/categories/Art"
          >
            Art
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#153e75", outline: "1.5px solid #153e75" }}
            to="/posts/categories/Investment"
          >
            Investment
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "purple", outline: "1.5px solid purple" }}
            to="/posts/categories/Uncategorized"
          >
            Uncategorized
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#00bcd4", outline: "1.5px solid #00bcd4" }}
            to="/posts/categories/Weather"
          >
            Weather
          </Link>
        </li>
      </ul>
      <div className="footer__copyright">
        <small>
          All Rights Reserved &copy; Copyright,{" "}
          <a
            target="_blank"
            style={{ textDecoration: "1px underline blue", color: "blue" }}
            href="https://gauravsonidev.vercel.app/"
          >
            Gaurav Soni
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
