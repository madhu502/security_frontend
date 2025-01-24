import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(""); // Track reCAPTCHA token

  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Save the reCAPTCHA token
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA.");
      return;
    }

    const data = {
      email: email,
      password: password,
      captchaToken: captchaToken, // Include the reCAPTCHA token in your API request
    };

    setIsLoading(true);

    loginUserApi(data)
      .then((res) => {
        console.log("Response:", res.data);
        setIsLoading(false);
        if (!res.data.success) {
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
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));
          navigate(res.data.userData.isAdmin ? "/" : "/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error:", err);
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
          <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <ReCAPTCHA
              sitekey="6LdM48EqAAAAACojHbA4V3fz2HBFm32sN3umvyIC" 
              onChange={handleCaptchaChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success mt-2 w-100"
            disabled={isLoading}
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
