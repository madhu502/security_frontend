import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!firstname.trim()) newErrors.firstname = "First name is required";
    if (!lastname.trim()) newErrors.lastname = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword.trim() !== password.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = { firstname, lastname, email, phone, password };

    registerUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="container w-50 my-3 shadow">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>Shopify</h1>
      </div>
      <div className="w-100">
        <h5 className="w-100 text-decoration-underline text-center">Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <p className="text-danger">{errors.firstname}</p>
            )}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your last name"
            />
            {errors.lastname && (
              <p className="text-danger">{errors.lastname}</p>
            )}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="w-100 text-center mt-2" style={{ color: "#333" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
