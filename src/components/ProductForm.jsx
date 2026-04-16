import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  setEditProduct,
} from "../features/products/productSlicer";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const { editProduct } = useSelector((state) => state.product || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    if (editProduct ) {
      setProduct(editProduct);
    } else {
      setProduct({});
    }
  }, [editProduct]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = product.id || product._id;

    if (productId) {
      dispatch(updateProduct({ ...product, id: productId }));
      dispatch(setEditProduct({}));
      setProduct({});
      navigate("/productList");
      return;
    }

    dispatch(createProduct(product));
    dispatch(setEditProduct({}));
    setProduct({});
  };
  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Add Product</h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  className="form-control"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  value={product.productName || ""}
                  required
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="form-control"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                  value={product.price || ""}
                  required
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  min="0"
                  onChange={handleChange}
                  value={product.stock || ""}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Electronics"
                  onChange={handleChange}
                  value={product.category || ""}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  value={product.imageUrl || ""}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="form-control"
                  placeholder="Short product description"
                  onChange={handleChange}
                  value={product.description || ""}
                  required
                />
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductForm;
