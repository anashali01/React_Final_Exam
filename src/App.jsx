import React from "react";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductItem from "./components/ProductItem.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAdmin>
              <Home />
            </RequireAdmin>
          }
        />
        <Route
          path="/productForm"
          element={
            <RequireAdmin>
              <ProductForm />
            </RequireAdmin>
          }
        />
        <Route
          path="/productList"
          element={
            <RequireAdmin>
              <ProductList />
            </RequireAdmin>
          }
        />
        <Route
          path="/productItem"
          element={
            <RequireAuth>
              <ProductItem />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
