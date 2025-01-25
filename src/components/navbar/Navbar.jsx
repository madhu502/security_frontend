import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // Get user data from local storage
  const userString = localStorage.getItem("user");
  const user =
    userString && userString !== "undefined" ? JSON.parse(userString) : null;

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg border-bottom border-2 shadow"
        style={{ color: "#fff" }} // Purple background and white text
      >
        <div className="container-fluid">
          <div className="logo">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Shopify Logo"
                className="logo-icon"
                style={{ height: "75px" }}
              />
            </Link>
          </div>
          <div className="logo-text">
            <Link to="/">
              <span className="logo-text fs-4">Shopify</span>
            </Link>
          </div>
          <div className="search-container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="nav-links collapse navbar-collapse mx-xl-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 text-center">
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink className="nav-link" to="/product">
                  Products
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink className="nav-link" to="/aboutus">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink className="nav-link" to="/contact">
                  Contacts
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink className="nav-link" to="/cart">
                  <span role="img" aria-label="cart">
                    Cart🛒
                  </span>
                </NavLink>
              </li>
            </ul>
            <div className="search-container w-25 text-center me-5 d-flex justify-content-center align-items-center">
              <input
                type="text"
                placeholder="Search Products"
                className="search-input form-control w-100"
              />
              <button className="search-button h-100 border-0 bg-white px-3">
                <FaSearch />
              </button>
            </div>
            <form className="d-flex w-25" role="search">
              {user ? (
                <>
                  <div
                    className="dropdown"
                    //  mt-3 mt-lg-auto w-100 text-center"
                  >
                    <button
                      className="btn btn-outline-black dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome {user.firstname}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={"/profile"}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/admin/dashboard"}>
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href={"/orderlist"}>
                          Order
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href={"/address"}>
                          Address
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className="dropdown-item"
                          href="#"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="auth-buttons d-flex justify-content-around align-items-sm-center w-100">
                    <Link
                      to="/register"
                      className="btn btn-sm btn-outline-primary"
                      type="submit"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline-success btn-sm"
                      type="submit"
                    >
                      Log In
                    </Link>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
