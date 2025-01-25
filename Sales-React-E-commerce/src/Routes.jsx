import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./cart/CartPage";
import {OrderDetails} from "./Orders/OrderComponent.jsx";
import CheckAuth from "./Auth.jsx";
import AdminHomePage from "./Admin/AdminHomePage.jsx";
import ProductForm from "./Admin/AdminHomePage.jsx";
import {ProductListForAdmin} from "./Admin/Products.jsx";




const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/customerhome" element={<CustomerHomePage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path={"/orders"} element={<OrderDetails/>}/>
            <Route path={"/adminhome"} element={<ProductForm/>}/>
            <Route path={"/items"} element={<ProductListForAdmin/>}/>oi
        </Routes>
    );
};

export default AppRoutes;