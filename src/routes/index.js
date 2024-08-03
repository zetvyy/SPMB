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
import ProtectedRoute from "../components/ProtectedRoute";

const RoutesPath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tes-minat"
          element={
            <ProtectedRoute>
              <TesMinat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tes-bakat"
          element={
            <ProtectedRoute>
              <TesBakat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracker-progress"
          element={
            <ProtectedRoute>
              <Tracker />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesPath;
