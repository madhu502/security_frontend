import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { kname } from "../../common/utils";

// import "./Navbar.css";

const Navbar = () => {
  // Get user data from local storage
  const users = JSON.parse(localStorage.getItem("user"));

  // logout Function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        class="navbar navbar-expand-lg border-bottom border-2 shadow"
        style={{ backgroundColor: "#024b60" }}
      >
        <div class="container-fluid">
          <div className="logo ">
            <a>
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="logo-icon"
                style={{ height: "75px" }}
              />
            </a>
          </div>
          <div className="logo-text ">
            <a>
              <span className="logo-text fs-4" style={{ color: "white" }}>
                {kname}
              </span>
            </a>
          </div>
          <div className="search-container ">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            class="nav-links collapse navbar-collapse mx-xl-5"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 text-center">
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  style={{ color: "white" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink
                  className="nav-link"
                  to="/product"
                  style={{ color: "white" }}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink
                  className="nav-link"
                  to="/aboutus"
                  style={{ color: "white" }}
                >
                  About Us
                </NavLink>
              </li>

              <li className="nav-item fs-6 fs-lg-5 mx-lg-3">
                <NavLink
                  className="nav-link"
                  to="/cart"
                  style={{ color: "white" }}
                >
                  <span role="img" aria-label="cart">
                    Cart
                  </span>
                </NavLink>
              </li>
            </ul>
            <div className="search-container w-25 text-center  me-5 d-flex justify-content-center align-items-center">
              <input
                type="text"
                placeholder="Search for products"
                className="search-input form-control w-100"
                style={{ color: "white" }}
              />
              <button
                className="search-button h-100 border-0  px-3"
                style={{ backgroundColor: "#024b60", color: "white" }}
              >
                <FaSearch />
              </button>
            </div>
            <form className="d-flex w-25" role="search">
              {users ? (
                <div className="dropdown mt-3 mt-lg-auto w-100 text-center">
                  <button
                    className="btn btn-outline-dark dropdown-toggle"
                    style={{ backgroundColor: "#024b60", color: "white" }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome {users.firstName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to={"/profile"}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={"/admin/dashboard"}
                      >
                        Admin Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/orderlist"}>
                        Order
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/address"}>
                        Address
                      </NavLink>
                    </li>
                    <li>
                      <a onClick={handleLogout} class="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="auth-buttons d-flex justify-content-around align-items-sm-center w-100">
                  <Link
                    to="/register"
                    className="btn btn-sm btn-outline-warning"
                    style={{ backgroundColor: "#3c869b", color: "white" }}
                    type="submit"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-sm btn-outline-warning"
                    style={{ backgroundColor: "#3c869b", color: "white" }}
                    type="submit"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
