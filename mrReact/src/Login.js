import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Your authentication logic goes here
    // For demonstration, let's assume authentication is successful if username and password are not empty
    if (username && password) {
      // Redirect to admin page after successful login
      // You can use history.push("/admin") if you are using withRouter HOC
      window.location.href = "/admin";
    }
  };

  return (
    <div style={loginContainerStyle}>
      <h2 style={titleStyle}>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <br />
      <button onClick={handleLogin} style={buttonStyle}>Login</button>
      <p style={linkStyle}>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

const loginContainerStyle = {
  width: "300px",
  margin: "auto",
  textAlign: "center",
};

const titleStyle = {
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

buttonStyle["&:hover"] = {
  backgroundColor: "#0056b3",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

export default Login;
