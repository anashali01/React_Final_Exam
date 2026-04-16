import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  setEditProduct,
} from "../features/products/productSlicer";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product || []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdate = (productId) => {
    let productToUpdate = products.find(
      (product) => product.id === productId || product._id === productId,
    );
    dispatch(setEditProduct(productToUpdate));
    navigate("/productForm");
  };

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Product List</h2>

          {!products.length ? (
            <div className="alert alert-secondary mb-0">
              No products available.
            </div>
          ) : (
            <div className="row g-3">
              {products.map((product) => (
                <div
                  className="col-md-6"
                  key={product.id || product._id || product.productName}
                >
                  <div className="card h-100">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="card-img-top"
                        style={{ objectFit: "cover", maxHeight: "220px" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text mb-1 text-muted">
                        {product.category || "Uncategorized"}
                      </p>
                      <p className="card-text mb-1">
                        {product.description || "No description provided."}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold">
                          $
                          {product.price
                            ? Number(product.price).toFixed(2)
                            : "0.00"}
                        </span>
                        <small className="text-muted">
                          Stock: {product.stock ?? "0"}
                        </small>
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            handleUpdate(product.id || product._id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(product.id || product._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
