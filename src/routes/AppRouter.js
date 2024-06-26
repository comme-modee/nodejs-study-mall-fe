import React from "react";
import { Route, Routes } from "react-router";
import AdminOrderPage from "../page/AdminOrderPage";
import AdminProduct from "../page/AdminProduct";
import CartPage from "../page/CartPage";
import Login from "../page/Login";
import MyPage from "../page/MyPage";
import OrderCompletePage from "../page/OrderCompletePage";
import PaymentPage from "../page/PaymentPage";
import ProductAll from "../page/ProductAll";
import ProductCategory from "../page/ProductCategory";
import ProductDetail from "../page/ProductDetail";
import RegisterPage from "../page/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import OrderDetailInfo from "../page/OrderDetailInfo";
import MyUserPage from "../page/MyUserPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductAll />} />
      <Route path="/:id" element={<ProductCategory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account" element={<MyUserPage />} />
        <Route path="/account/purchase" element={<MyPage />} />
        <Route path="/account/purchase/:id" element={<OrderDetailInfo />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
