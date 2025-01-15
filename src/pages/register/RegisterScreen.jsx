import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
  // Make a useState for 5 fields
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UseState for error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook

  // Make functions for each changing the values

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //validation
  var validate = () => {
    var isValid = true;

    // validate the first name
    if (firstname.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }

    // validate the last name
    if (lastname.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    }

    // validate the email
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    // validate the phone
    if (phone.trim() === "") {
      setPhoneError("Phone number is required");
      isValid = false;
    }

    // validate the password
    if (password.trim() === "") {
      setPasswordError("password is required");
      isValid = false;
    }

    // validate the confirm password
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    }
    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password doesnot match");
      isValid = false;
    }
    return isValid;
  };
  //Submit button function
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate
    var isValidated = validate();
    if (!isValidated) {
      return;
    }

    // sending request to the api

    //Making json object
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password,
    };

    registerUserApi(data).then((res) => {
      // Received Data: success, message

      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        navigate("/login"); // Navigate to the homepage
      }
    });
  };

  return (
    <div className='container w-50 my-3 shadow'>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>Shopify </h1>
        
      </div>
      <div className='w-100'>
        <h5 className='w-100 text-decoration-underline text-center'>Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='firstName' className='form-label'>
              First Name :{firstname}
            </label>
            <input
              onChange={handleFirstname}
              type='text'
              className='form-control'
              placeholder='Enter your first name'
            />
            {firstNameError && <p className='text-danger'>{firstNameError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label className='form-label'>Last Name : {lastname}</label>
            <input
              onChange={handleLastname}
              type='text'
              className='form-control'
              placeholder='Enter your last name'
            />
            {lastNameError && <p className='text-danger'>{lastNameError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='email' className='form-label'>
              Email : {email}
            </label>
            <input
              onChange={handleEmail}
              type='text'
              className='form-control'
              placeholder='Enter your email'
            />
            {emailError && <p className='text-danger'>{emailError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='email' className='form-label'>
              Phone{" "}
            </label>
            <input
              onChange={handlePhone}
              type='text'
              className='form-control'
              placeholder='Enter your Phone Number'
            />
            {phone && <p className='text-danger'>{phoneError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='password' className='form-label'>
              Password :{password}
            </label>
            <input
              onChange={handlePassword}
              type='text'
              className='form-control'
              placeholder='Enter your password'
            />
            {passwordError && <p className='text-danger'>{passwordError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password : {confirmPassword}
            </label>
            <input
              onChange={handleConfirmPassword}
              type='password'
              className='form-control'
              placeholder='Enter your confirm password'
            />
            {confirmPasswordError && (
              <p className='text-danger'>{confirmPasswordError}</p>
            )}
          </div>
          <button onClick={handleSubmit} className='btn btn-success w-100'>
            Register
          </button>
        </form>
        <p
          className='w-100 text-center mt-2'
          style={{ marginTop: "10px", color: "#333" }}
        >
          Already have an account?{" "}
          <a
            href='/login'
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
