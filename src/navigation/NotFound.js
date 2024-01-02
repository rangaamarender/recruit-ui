import React from "react";
import { Link } from "react-router-dom";
import ROOT from "./PageConstants.js";

const NotFound = () => {
  return (
    <div>
      <Link to={ROOT}>Home</Link>
      <h3>404: page not found!</h3>
    </div>
  );
};

export default NotFound;
