import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn"; // Import password strength checker
import { registerUserApi } from "../../apis/Api";
import { sanitizeInput } from "../../common/inputSanitizer";
import { kname } from "../../common/utils";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showStrengthBar, setShowStrengthBar] = useState(false);

  const navigate = useNavigate();

  const handleFirstname = (e) =>
    setFirstName(sanitizeInput(e.target.value, "text"));
  const handleLastname = (e) =>
    setLastName(sanitizeInput(e.target.value, "text"));
  const handleEmail = (e) => setEmail(sanitizeInput(e.target.value, "email"));
  const handlePhone = (e) => setPhone(sanitizeInput(e.target.value, "number"));

  const handlePassword = (e) => {
    const newPassword = sanitizeInput(e.target.value, "password");
    setPassword(newPassword);

    // Show strength bar when user starts typing
    setShowStrengthBar(newPassword.length > 0);

    // Use zxcvbn to check password strength (Score: 0 - 4)
    const strength = zxcvbn(newPassword).score;
    setPasswordStrength(strength);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Password Strength Feedback UI
  const renderPasswordStrength = () => {
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#27ae60",
    ];

    return (
      <div className="mt-2">
        <div className="progress" style={{ height: "5px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${(passwordStrength + 1) * 20}%`,
              backgroundColor: strengthColors[passwordStrength],
            }}
          ></div>
        </div>
        <small style={{ color: strengthColors[passwordStrength] }}>
          {strengthLabels[passwordStrength]}
        </small>
      </div>
    );
  };

  // Form Validation
  const validate = () => {
    let isValid = true;

    if (!firstname.trim()) {
      toast.error("First name is required");
      isValid = false;
    }

    if (!lastname.trim()) {
      toast.error("Last name is required");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Invalid email format");
      isValid = false;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      isValid = false;
    }

    if (passwordStrength < 2) {
      toast.error("Password is too weak. Please use a stronger password.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      firstName: firstname,
      lastName: lastname,
      email,
      phone,
      password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success("Registration successful. Verify your email to log in.");
        navigate("/login");
      }
    });
  };

  return (
    <div className="container w-50 my-3 shadow p-4">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname}</h1>
        <p style={{ color: "#333" }}>
          {" "}
          Widgets Made Simple, Shopping Made Smarter!{" "}
        </p>
      </div>
      <h5 className="text-decoration-underline text-center">Sign Up</h5>
      <form onSubmit={handleSubmit}>
        <label className="form-label">First Name:</label>
        <input
          onChange={handleFirstname}
          type="text"
          className="form-control"
          placeholder="Enter your first name"
        />

        <label className="form-label mt-2">Last Name:</label>
        <input
          onChange={handleLastname}
          type="text"
          className="form-control"
          placeholder="Enter your last name"
        />

        <label className="form-label mt-2">Email:</label>
        <input
          onChange={handleEmail}
          type="email"
          className="form-control"
          placeholder="Enter your email"
          required
        />

        <label className="form-label mt-2">Phone:</label>
        <input
          onChange={handlePhone}
          type="text"
          className="form-control"
          placeholder="Enter your phone number"
        />

        <label className="form-label mt-2">Password:</label>
        <input
          onChange={handlePassword}
          type="password"
          className="form-control"
          placeholder="Enter your password"
        />
        {showStrengthBar && renderPasswordStrength()}

        <label className="form-label mt-2">Confirm Password:</label>
        <input
          onChange={handleConfirmPassword}
          type="password"
          className="form-control"
          placeholder="Confirm password"
        />

        <button
          className="btn btn-success w-100 mt-3"
          style={{ backgroundColor: "#024b60" }}
          type="submit"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-2">
        Already have an account?{" "}
        <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
