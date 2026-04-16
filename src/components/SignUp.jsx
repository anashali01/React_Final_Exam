import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../features/users/userSlice";

const SignUp = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(user));
    setUser({});
    navigate("/signin");
  };
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div
              className="card-body p-4 p-md-5"
              style={{ background: "rgba(15, 23, 42, 0.95)" }}
            >
              <div className="mb-4 text-center">
                <h1 className="h3 mb-2 text-white">Create your account</h1>
                <p className="text-white-50 mb-0">
                  Join ProductiFy and start managing your catalog.
                </p>
              </div>

              <form method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-white">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Jane Doe"
                    onChange={handleChange}
                    value={user.fullName || ''}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="jane@example.com"
                    onChange={handleChange}
                    value={user.email || ''}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label text-white">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="Enter password"
                      onChange={handleChange}
                      value={user.password || ''}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="Repeat password"
                      onChange={handleChange}
                      value={user.confirmPassword || ''}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="company" className="form-label text-white">
                    Company (optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="ProductiFy Inc."
                    onChange={handleChange}
                    value={user.company || ''}
                    required
                  />
                </div>

                

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign Up
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="mb-0 text-white-50">
                  Already a member?{" "}
                  <Link to="/signin" className="text-info">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
