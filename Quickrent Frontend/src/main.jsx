import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Categories from "./Pages/Categories.jsx";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLogin from "./Pages/AdminLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Contact from "./Pages/Contact.jsx";
import Orders from "./components/Orders.jsx";
import Address from "./components/Address.jsx";
import Profile from "./components/Profile.jsx";
import ConflictHandlingPage from "./components/ConflictHandlingPage.jsx";

import SellerLayout from "./components/seller/SellerLayout";
import Dashboard from "./components/seller/Dashboard";
import AddItem from "./components/seller/AddItem";
import { ItemProvider } from "./context/ItemContext";
import AddDocumentForm from "./components/seller/AddDocumentForm";
import SellerProfile from "./components/seller/sellerProfile.jsx";

import { DashNav } from "./components/DashNav.jsx";
import SearchAndFilter from "./components/SearchAndFilter";
import AddAdmin from "./components/AddAdmin";
import AddCategory from "./components/AddCategory";

import ProductDescription from "./Pages/ProductDescription.jsx"
import CheckoutPage from "./Pages/CheckoutPage.jsx"
import OrderPage from "./Pages/OrderPage.jsx"
import { CustomerProtectedRoutes } from "./utils/CustomerProtectedRoutes.jsx";
import { SellerProtectedRoutes } from "./utils/SellerProtectedRoutes.jsx";
import { AdminProtectedRoutes } from "./utils/AdminProtectedRoutes.jsx";
import UnAuthorized from "./Pages/UnAuthorized.jsx";
import Otp from "./Pages/Otp.jsx";
import AppLayout from "./utils/AppLayout.jsx";
import AdminLayout from "./utils/AdminLayout.jsx";
import AdminLoginForm from "./components/AdminLoginForm.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ItemProvider>
      <Router>
        <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminlogin" element={<AdminLoginForm />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/description" element={<ProductDescription />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />

          <Route element={<CustomerProtectedRoutes />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-placed" element={<OrderPage />} />
            <Route path="/userinfo" element={<Profile />} />
            <Route path="/useraddr" element={<Address />} />
            <Route path="/userorders" element={<Orders />} />
          </Route>

          <Route path="/conflicthandlingform" element={<ConflictHandlingPage />} />
          <Route path="/verifyemail" element={<Otp />} />
          {/* <Route path="/payment" element={<RazorPage />} /> */}
        </Route>


          <Route element={<SellerProtectedRoutes />}> 
            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-item" element={<AddItem />} />
              <Route path="add-document-form" element={<AddDocumentForm />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          
        <Route element={<AdminProtectedRoutes />}>   
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<SearchAndFilter />} />
            <Route path="/admin/add-admin" element={<AddAdmin />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
          </Route>
        </Route>
        
    
          
        </Routes>
      </Router>
    </ItemProvider>
  </React.StrictMode>
);
