import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const navigate = useNavigate(); // Use useNavigate hook

  const validation = () => {
    let isValid = true;

    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(""); // Clear error when input is valid
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(""); // Clear error when input is valid
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!validation()) {
      return;
    }

    setIsLoading(true); // Set loading state to true

    // Make API request
    const data = { email, password };
    loginUserApi(data)
      .then((res) => {
        setIsLoading(false); // Reset loading state
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          console.log("User Data:", res.data.userData);

          // Store token and user data in localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));

          navigate("/"); // Redirect to homepage
        }
      })
      .catch((error) => {
        setIsLoading(false); // Reset loading state
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      });
  };

  return (
    <div
      className="shadow w-25 bg-light container mt-5"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>Shopify</h1>
      </div>
      <div>
        <h5 className="my-3 w-100 text-center text-decoration-underline">
          Login
        </h5>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control w-100"
              placeholder="Enter your email"
              value={email}
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "right" }}>
            <a
              href="/forgot-password"
              style={{
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-success mt-2 w-100"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <p style={{ marginTop: "10px", color: "#333" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
