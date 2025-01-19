import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    setIsLoading(true);

    loginUserApi(data)
      .then((res) => {
        console.log("Response:", res.data); // Log the response data
        setIsLoading(false);
        if (!res.data.success) {
          // Display lockUntil only if the account is actually locked
          if (res.data.lockUntil && new Date(res.data.lockUntil) > new Date()) {
            toast.error(
              `Your account is locked until ${new Date(
                res.data.lockUntil
              ).toLocaleString()}.`
            );
          }

          toast.error(res.data.message);
        } else {
          toast.success("Login successful!");

          // Set token and user data in local storage
          localStorage.setItem("token", res.data.token);

          // Set user data
          localStorage.setItem("user", JSON.stringify(res.data.userData));

          // Redirect based on user role
          if (!res.data.userData.isAdmin) {
            navigate("/");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error:", err); // Log the error details
        toast.error("Server Error");
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
              onChange={changeEmail}
              type="text"
              className="form-control w-100"
              placeholder="Enter your email"
              value={email}
            />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={changePassword}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
            />
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
