import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../features/users/userSlice";

const SignIn = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const location = useLocation();
  const from = location.state?.from?.pathname || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    const existingUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (existingUser) {
      localStorage.setItem("authToken", "true");
      localStorage.setItem("authRole", existingUser.role);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: existingUser.id,
          email: existingUser.email,
          fullName: existingUser.fullName,
          role: existingUser.role,
        }),
      );

      const defaultRedirect =
        existingUser.role === "admin" ? "/productList" : "/productItem";
      const safeRedirect =
        from && (existingUser.role === "admin" || from === "/productItem")
          ? from
          : defaultRedirect;

      alert(`Welcome back, ${existingUser.fullName}!`);
      navigate(safeRedirect, { replace: true });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div
              className="card-body p-4 p-md-5"
              style={{ background: "rgba(15, 23, 42, 0.95)" }}
            >
              <div className="text-center mb-4">
                <h1 className="h3 mb-2 text-white">Sign in to ProductiFy</h1>
                <p className="text-white-50 mb-0">
                  Access your product dashboard and manage your store.
                </p>
              </div>

              <form method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    value={user.email || ""}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={user.password || ""}
                  />
                </div>
                {error && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {error}
                  </div>
                )}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign In
                  </button>
                </div>

                <div className="text-center">
                  <p className="mb-0 text-white-50">
                    New here?{" "}
                    <Link to="/signup" className="text-info">
                      Create an account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
