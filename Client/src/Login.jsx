import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result.data);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="text-danger mt-3">{error}</p>}
        <p className="mt-3">Do not have an account? <Link to="/register" className="signup-link">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;