import React, { useContext, useState } from 'react';
import "./login.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: null,
    password: null
  })

  const {user, loading, error, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});

    try {
        const userResponse = await axios.post("http://localhost:5000/api/auth/login", credentials);
        dispatch({type: "LOGIN_SUCCESS", payload: userResponse.data});
        navigate("/");
    } catch(err) {
        dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
    }
  }

//   console.log(user);

  return (
    <div className='login'>
        <div className='login-container'>
            <h3>Log in to book a room!</h3>
            <input type="text" className='login-input' id='username' placeholder='Username' onChange={handleChange} />
            <input type="password" className='login-input' id='password' placeholder='Password' onChange={handleChange} />
            <button disabled={loading} onClick={handleLogin} className='login-btn'>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login