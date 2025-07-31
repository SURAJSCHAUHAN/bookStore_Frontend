import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
