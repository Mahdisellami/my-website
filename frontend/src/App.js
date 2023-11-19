import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddTruth from "./components/AddTruth";
import Truth from "./components/Truth";
import TruthsList from "./components/TruthsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          bahta
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/truths"} className="nav-link">
              Truths
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/truths" element={<TruthsList/>} />
          <Route path="/add" element={<AddTruth/>} />
          <Route path="/truths/:id" element={<Truth/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;