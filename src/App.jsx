import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { BookDescription } from "../components/BookDescription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book/:id" element={<BookDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
