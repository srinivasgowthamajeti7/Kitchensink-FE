import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const MemberRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    apiError: "",
  });

  const validateName = (value) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (/\d/.test(value)) {
      return "Name should not contain numbers";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!value.trim()) {
      return "Phone number is required";
    }
    if (!phoneRegex.test(value)) {
      return "Phone number must be 10 digits";
    }
    return "";
  };





  useEffect(() => {
    setErrors({...errors, apiError: ""})
  }, [name, phone, email]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    let validationError = "";

    switch (field) {
      case "name":
        setName(value);
        validationError = validateName(value);
        break;
      case "email":
        setEmail(value);
        validationError = validateEmail(value);
        break;
      case "phone":
        setPhone(value);
        validationError = validatePhone(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validationError,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (nameError || emailError || phoneError) {
      return;
    }

    axios
      .post("http://localhost:8081/api/members", {
        name,
        email,
        phoneNumber: phone,
      })
      .then((res) => {
        GetRegisteredMembers();
        console.log(res);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error submitting member:", error);
        setErrors({ ...errors, apiError: error?.response?.data });
      });
  };

  useEffect(() => {
    GetRegisteredMembers();
  }, []);

  function GetRegisteredMembers() {
    axios
      .get("http://localhost:8081/api/members")
      .then((res) => {
        setMembers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
       
      });
  }

  return (
    <div>
      <h2>Welcome to JBoss!</h2>
      <p>You have successfully deployed a Jakarta EE Enterprise Application.</p>
      <div style={{ border: "1px solid black", padding: "24px" }}>
        <div
          style={{
            marginBottom: "6px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "10%" }}>
            <label>Name:</label>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
            required
          />
          {errors.name && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {errors.name}
            </span>
          )}
        </div>
        <div
          style={{
            marginBottom: "6px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "10%" }}>
            <label>Email:</label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            required
          />
          {errors.email && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {errors.email}
            </span>
          )}
        </div>
        <div
          style={{
            marginBottom: "6px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "10%" }}>
            <label>Phone#:</label>
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => handleInputChange(e, "phone")}
            required
          />
          {errors.phone && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {errors.phone}
            </span>
          )}
        </div>
        <div>
          {errors.apiError && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {errors.apiError}
            </span>
          )}
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
      <h3>Members</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>REST URL</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{`/rest/members/${index + 1}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberRegistration;