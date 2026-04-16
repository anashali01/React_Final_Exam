import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlicer';

const ProductItem = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product || {});
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = new Set();
    products.forEach((product) => {
      if (product.category) unique.add(product.category);
    });
    return ['all', ...Array.from(unique).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const title = String(product.productName || '').toLowerCase();
      const category = String(product.category || '').toLowerCase();
      const matchesQuery =
        !lowerQuery || title.includes(lowerQuery) || category.includes(lowerQuery);
      const matchesCategory =
        categoryFilter === 'all' || category === categoryFilter.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  return (
    <section className="container py-4">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2 className="mb-2 text-white">Products</h2>
          <p className="text-white mb-0">Search and browse your product cards below.</p>
        </div>
        <div className="w-100">
          <div className="row g-2">
            <div className="col-12 col-md-7">
              <div className="input-group">
                <span className="input-group-text">Search</span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by product name or category"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text">Category</span>
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-secondary">No products found.</div>
      ) : (
        <div className="row g-3">
          {filteredProducts.map((product) => {
            const key = product.id || product._id || product.productName || product.title || product.description;
            return (
              <div className="col-12 col-md-6 col-xl-4" key={key}>
                <div className="card h-100 shadow-sm">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.productName || product.title}
                      className="card-img-top"
                      style={{ objectFit: 'cover', maxHeight: '220px' }}
                    />
                  ) : (
                    <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '220px' }}>
                      <span className="text-muted">No image available</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.productName || product.title || 'Product'}</h5>
                    <p className="card-text text-white mb-2">
                      {product.category || 'Uncategorized'}
                    </p>
                    <p className="card-text mb-3">
                      {product.description || 'No description provided.'}
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-semibold">
                          ${product.price ? Number(product.price).toFixed(2) : '0.00'}
                        </span>
                        <small className="text-white">Stock: {product.stock ?? '0'}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>

    );
};  

export default ProductItem;

