import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8070/auth/loginEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      if (response.status === 200) {
     
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);

        navigate('/staffHome');
      } else {
        setMessage('Authentication failed');
      }
    } catch (error) {
      setMessage('Authentication failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>

      <div id="message">{message}</div>
    </div>
  );
};

export default Login;
