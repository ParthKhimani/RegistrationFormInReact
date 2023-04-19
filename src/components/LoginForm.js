import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegistrationForm.css";
import "./LoginForm.css";

function LoginForm() {
  var statusCode;
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  //Submit Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(contactNumber) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  function handleEmailChange(e) {
    const email = e.target.value.trim();
    setEmail(email);

    const emailError =
      email === ""
        ? "Email is required"
        : !validateEmail(email)
        ? "Invalid email format"
        : "";
    setEmailError(emailError);
  }

  function handlePasswordChange(e) {
    const password = e.target.value.trim();
    setPassword(password);

    const passwordError =
      password === ""
        ? "*Password is required!"
        : !validatePassword(password)
        ? "*Password is not valid!"
        : "";
    setPasswordError(passwordError);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = { email: email, password: password };

    // check if there are any errors

    if (!email) {
      setEmailError("*Email Id is Required!");
    }
    if (!password) {
      setPasswordError("*Password is Required!");
    } else {
      // rest of the code to submit the form
      fetch("http://localhost:3434/dashBoard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          statusCode = response.status;
          return response.json();
        })
        .then(() => {
          if (statusCode === 202) {
            navigate("/DashBoard");
          }
          if (statusCode === 404) {
            setError("*invalid Credentials");
          }
        });
    }
  }

  return (
    <div className="box" data-component>
      <h2>Login Form</h2>
      <hr />
      <form className="RegistrationForm" onSubmit={handleSubmit}>
        <label>Email Id:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <div className="errors">{emailError}</div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="errors">{passwordError}</div>
        <hr />
        <div className="errors">{error}</div>
        <center>
          <button type="submit" className="submit">
            Login
          </button>
        </center>
      </form>
      <center>
        <label>New User ?</label>
        <a onClick={handleClick}>Register</a>
      </center>
    </div>
  );
}
export default LoginForm;
