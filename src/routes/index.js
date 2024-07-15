import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import TesMinat from "../pages/tes-minat";
import TesBakat from "../pages/tes-bakat";
import Tracker from "../pages/Tracker";
import About from "../pages/about";

const RoutesPath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tes-minat" element={<TesMinat />} />
        <Route path="/tes-bakat" element={<TesBakat />} />
        <Route path="/tracker-progress" element={<Tracker />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default RoutesPath;
