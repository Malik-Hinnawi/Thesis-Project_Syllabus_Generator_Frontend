import React from "react";
import logo from "../assets/images/logo-bw.png";
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <img src={logo} alt="logo" className="not-found-logo" />
      <h2>Page you are looking for is not found...</h2>
    </div>
  );
};

export default NotFoundPage;
