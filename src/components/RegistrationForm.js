import "./RegistrationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function RegistrationForm() {
  var statusCode;

  //multi-select options
  const options = [
    { value: "node", label: "Node js" },
    { value: "react", label: "React js" },
    { value: "angular", label: "Angular js" },
  ];

  //navigate between pages
  const navigate = useNavigate();
  function handleClick() {
    navigate("/LoginForm");
  }

  //Submit Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [programmingSkills, setProgrammingSkills] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [error, setError] = useState("");

  const formData = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    emailId: emailId,
    contactNumber: contactNumber,
    dateOfBirth: dateOfBirth,
    password: password,
    confirmPassword: confirmPassword,
    programmingSkills: programmingSkills,
    qualification: qualification,
    address: address,
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validateContactNumber(contactNumber) {
    const regex = /^\d{10}$/;
    return regex.test(contactNumber);
  }

  function validatePassword(contactNumber) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);

    if (e.target.value.trim() === "") {
      setFirstNameError("*First Name is required!");
    } else {
      setFirstNameError("");
    }
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);

    if (e.target.value.trim() === "") {
      setLastNameError("*Last Name is required!");
    } else {
      setLastNameError("");
    }
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);

    if (e.target.value.trim() === "") {
      setUserNameError("*User Name is required!");
    } else {
      setUserNameError("");
    }
  }

  function handleEmailIdChange(e) {
    const email = e.target.value.trim();
    setEmailId(email);

    const emailIdError =
      email === ""
        ? "*Email is required!"
        : !validateEmail(email)
        ? "*Invalid email format!"
        : "";
    setEmailIdError(emailIdError);
  }

  function handleContactNumberChange(e) {
    const contactNumber = e.target.value.trim();
    setContactNumber(contactNumber);

    const contactNumberError =
      contactNumber === ""
        ? "*Contact Number is required!"
        : !validateContactNumber(contactNumber)
        ? "*Invalid Contact Number!"
        : "";
    setContactNumberError(contactNumberError);
  }

  function handleDateOfBirthChange(e) {
    setDateOfBirth(e.target.value);

    if (e.target.value.trim() === "") {
      setDateOfBirthError("*Date of Birth is required!");
    } else {
      setDateOfBirthError("");
    }
  }

  function handlePasswordChange(e) {
    const password = e.target.value.trim();
    setPassword(password);

    const passwordError =
      password === ""
        ? "*Password is required!"
        : !validatePassword(password)
        ? "*Please use Strong Password!"
        : "";
    setPasswordError(passwordError);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);

    if (e.target.value !== password) {
      setConfirmPasswordError("*Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
  }
  const handleSkillSelection = (event) => {
    const skill = event;
    if (skill) {
      setProgrammingSkills(skill);
    } else {
      const updatedSkills = programmingSkills.filter((s) => s !== skill);
      setProgrammingSkills(updatedSkills);
    }
  };

  function handleAddressChange(e) {
    setAddress(e.target.value);

    if (e.target.value.trim().length >= 100) {
      setAddressError("*Address is too long!");
    } else {
      setAddressError("");
    }
  }

  function handleQualificationChange(e) {
    const { checked, value } = e.target;
    if (checked) {
      setQualification([...qualification, value]);
      setQualificationError("");
    } else {
      const updatedQualification = qualification.filter((q) => q !== value);
      setQualification(updatedQualification);
      console.log(updatedQualification);
      if (updatedQualification.length == 0) {
        setQualificationError("*Select atleast one Qualification!");
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName) {
      setFirstNameError("*First Name is Required!");
    }
    if (!lastName) {
      setLastNameError("*Last Name is Required!");
    }
    if (!userName) {
      setUserNameError("*User Name is Required!");
    }
    if (!contactNumber) {
      setContactNumberError("*Contact Number is Required!");
    }
    if (!emailId) {
      setEmailIdError("*Email Id is Required!");
    }
    if (!dateOfBirth) {
      setDateOfBirthError("*Date Of Birth is Required!");
    }
    if (!password) {
      setPasswordError("*Password is Required!");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("*Confirm Password is Required!");
    }
    if (!address) {
      setAddressError("*Address is Required!");
    }
    if (!qualification) {
      setQualificationError("*Select atleast one qualification!");
    } else {
      console.log("Form submitted");
      fetch("http://localhost:3434/loginPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          statusCode = response.status;
          return response.json();
        })
        .then(() => {
          if (statusCode === 202) {
            navigate("/LoginForm");
          }
          if (statusCode === 404) {
            setError("*Email Id Already Exist!");
          }
        });
    }
  }

  //age validation
  const currentDate = new Date();
  const eighteenYearsAgoYear = currentDate.getFullYear() - 18;
  const eighteenYearsAgoDate = new Date(
    eighteenYearsAgoYear,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDate = eighteenYearsAgoDate.toISOString().substring(0, 10);

  //cascading dropdown logic
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <div className="box">
      <h2>Registration Form</h2>
      <hr />
      <form className="RegistrationForm" onSubmit={handleSubmit}>
        <div className="Container">
          <label>First Name:</label>
          <div className="errorContainer">
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <div className="errors">{firstNameError}</div>
          </div>
          <label>Last Name:</label>
          <div className="errorContainer">
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <div className="errors">{lastNameError}</div>
          </div>
        </div>
        <div className="Container">
          <label>User Name:</label>
          <div className="errorContainer">
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
            />
            <div className="errors">{userNameError}</div>
          </div>
          <label>Email Id:</label>
          <div className="errorContainer">
            <input
              type="email"
              value={emailId}
              onChange={handleEmailIdChange}
            />
            <div className="errors">{emailIdError}</div>
          </div>
        </div>
        <div className="Container">
          <label>Contact Number:</label>
          <div className="errorContainer">
            <input
              type="number"
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
            <div className="errors">{contactNumberError}</div>
          </div>
          <label>Date Of Birth:</label>
          <div className="errorContainer">
            <input
              type="date"
              max={minDate}
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
            <div className="errors">{dateOfBirthError}</div>
          </div>
        </div>
        <div className="Container">
          <label>Password:</label>
          <div className="errorContainer">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="errors">{passwordError}</div>
          </div>
          <label>Confirm Password:</label>
          <div className="errorContainer">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="errors">{confirmPasswordError}</div>
          </div>
        </div>
        <div className="Container">
          <label>Programming Skills:</label>
          <Select
            isMulti
            options={options}
            className="select"
            onChange={handleSkillSelection}
          />
        </div>
        <div className="Container">
          <label>Gender:</label>
          <label className="radio">Male:</label>
          <input type="radio" name="gender" value="male" />
          <label className="radio">Female:</label>
          <input type="radio" name="gender" value="female" />
        </div>
        <div className="Container">
          <label>Country:</label>
          <select
            value={value1}
            onChange={(event) => {
              setValue1(event.target.value);
            }}
          >
            <option value="none">Select country</option>
            <option value="option1">India</option>
            <option value="option2">USA</option>
          </select>
          <label>State:</label>
          <select
            value={value2}
            onChange={(event) => {
              setValue2(event.target.value);
            }}
          >
            <option value="">Select State</option>
            {value1 === "option1" && (
              <>
                <option value="option1-1">Gujarat</option>
                <option value="option1-2">Maharastra</option>
              </>
            )}
            {value1 === "option2" && (
              <>
                <option value="option2-1">California</option>
                <option value="option2-2">Georgia</option>
              </>
            )}
          </select>
          <label>City:</label>
          <select
            value={value3}
            onChange={(event) => {
              setValue3(event.target.value);
            }}
          >
            <option value="">Select City</option>
            {value1 === "option1" && value2 === "option1-1" && (
              <>
                <option value="option1-1">Rajkot</option>
                <option value="option1-2">Ahmedabad</option>
              </>
            )}
            {value1 === "option1" && value2 === "option1-2" && (
              <>
                <option value="option2-1">Mumbai</option>
                <option value="option2-2">Pune</option>
              </>
            )}
            {value1 === "option2" && value2 === "option2-1" && (
              <>
                <option value="option2-1">Los Angeles</option>
                <option value="option2-2">San Francisco</option>
              </>
            )}
            {value1 === "option2" && value2 === "option2-2" && (
              <>
                <option value="option2-1">Atlanta</option>
                <option value="option2-2">Columbus</option>
              </>
            )}
          </select>
        </div>
        <div className="Container">
          <label>Address:</label>
          <div className="errorContainer">
            <textarea
              rows="2"
              cols="20"
              value={address}
              onChange={handleAddressChange}
            />
            <div className="errors">{addressError}</div>
          </div>
          <label>Profile:</label>
          <input type="file" />
        </div>
        <div className="container">
          <div className="errorContainer">
            <label>Qualification:</label>
            <label>BCA</label>
            <input
              type="checkbox"
              value="BCA"
              onChange={handleQualificationChange}
            />
            <label>MCA</label>
            <input
              type="checkbox"
              value="MCA"
              onChange={handleQualificationChange}
            />
            <label>B.tech.</label>
            <input
              type="checkbox"
              value="B.Tech."
              onChange={handleQualificationChange}
            />
            <div className="errors">{qualificationError}</div>
          </div>
        </div>
        <hr />
        <div className="errors">{error}</div>
        <center>
          <button type="submit" className="submit">
            Register
          </button>
        </center>
      </form>
      <center>
        <label>Already Registered ?</label>
        <a onClick={handleClick}>Login</a>
      </center>
    </div>
  );
}

export default RegistrationForm;
