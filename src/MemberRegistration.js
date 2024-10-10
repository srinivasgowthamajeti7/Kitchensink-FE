import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const MemberRegistration = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/members", { name, email, phoneNumber:phone })
      .then((res) => {
        GetRegisteredMembers();
        console.log(res);
      })
      .catch((error) => {
        console.error("Error submitting member:", error);
        setError(error?.response?.data)
      });
    setName("");
    setEmail("");
    setPhone("");
  };

  useEffect(() => {
    GetRegisteredMembers();
  }, []);

  useEffect(() => {
   setError("")
  }, [name,phone,email]);

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
        <div style={{ marginBottom: "6px", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "10%" }}>
            <label>Name:</label>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "6px", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "10%" }}>
            <label>Email:</label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span style={{color:"red"}} >{error}</span>
        </div>
        <div style={{ marginBottom: "6px", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "10%" }}>
            <label>Phone#:</label>
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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
          {members.map((member,index) => (
            <tr key={member.id}>
              <td>{index+1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{`/rest/members/${index+1}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberRegistration;
