import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditProduct } from "../features/products/productSlicer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    dispatch(setEditProduct({}));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg modern-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand modern-brand" to="/">
            ProductiFy
          </Link>
          <button
            className="navbar-toggler modern-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link modern-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle modern-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul className="dropdown-menu modern-dropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/productForm"
                      onClick={handleAddProduct}
                    >
                      Product Form
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/productList">
                      Product List
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/productItem">
                      Product Items
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2 modern-actions">
              <button
                className="btn btn-sm btn-outline-light modern-cta"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
