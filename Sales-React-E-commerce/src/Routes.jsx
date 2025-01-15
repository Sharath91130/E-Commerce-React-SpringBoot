import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./cart/CartPage";
import MyCart from "./cart/MyCart.jsx";
import Epcart2 from "./cart/MyCart.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/cart" element={<CartPage/>} />
    </Routes>
  );
};

export default AppRoutes;
