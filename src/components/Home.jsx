import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlicer";
import { getUsers } from "../features/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product || {});
  const { users = [] } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
  }, [dispatch]);

  const productCount = products.length;
  const userCount = users.length;
  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock ?? 0),
    0,
  );
  const lowStockCount = products.filter(
    (product) => Number(product.stock ?? 0) > 0 && Number(product.stock ?? 0) <= 5,
  ).length;

  return (
    <section className="container py-5">
      <div className="mb-4 text-center">
        <h1 className="mb-2 text-white">Dashboard</h1>
        <p className="text-white-50">
          Quick overview of products and users on the homepage.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h6 className="text-uppercase text-secondary mb-3">Products</h6>
              <h2 className="mb-2">{productCount}</h2>
              <p className="mb-0 text-white-50">Total number of products.</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h6 className="text-uppercase text-secondary mb-3">Users</h6>
              <h2 className="mb-2">{userCount}</h2>
              <p className="mb-0 text-white-50">Total number of registered users.</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h6 className="text-uppercase text-secondary mb-3">Total Stock</h6>
              <h2 className="mb-2">{totalStock}</h2>
              <p className="mb-0 text-white-50">Combined stock quantity across all products.</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h6 className="text-uppercase text-secondary mb-3">Low Stock</h6>
              <h2 className="mb-2">{lowStockCount}</h2>
              <p className="mb-0 text-white-50">Products with 5 or fewer items left.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
