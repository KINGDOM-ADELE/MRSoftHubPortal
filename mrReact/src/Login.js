import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Context/App_Context'
import { BeatLoader } from 'react-spinners';


function Login() {
  const { API_base_url, handleAlreadyLoggedIn, StoreToken, StoreUserObj} = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

console.log('login API_base_url', API_base_url)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_base_url}api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        data.token && StoreToken(data.token) 
        data.data && StoreUserObj(data.data)
        console.log('User ', data.data)
        if(data.data.role === 'admin'){
          navigate(`/Admin`)
        }
        else{
          navigate(`/`)
        }
      } else {
        throw Error(`${data.message}`)
      }

    } catch (error) {
      console.error('Error during login:', error);
      setError(`${error}...`);
    }

    setIsLoading(false);
  };

  return (
    <div style={loginContainerStyle}>
      <h2 style={titleStyle}>Admin Login</h2>
      <input
        type='email'
        name='email'
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <br />
      <input
        type='password'
        name='password'
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />
      <br />
      {error && <div className='error-message'>{error}</div>}

      <button onClick={handleSubmit} style={buttonStyle}>
       
        {isLoading ? (
          <BeatLoader color='#ffffff' loading={isLoading} size={8} />
        ) : (
          'Login'
        )}
        </button>
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
