import { useState } from 'react';
import axios from 'axios'; // Import Axios
import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await axios.post('http://localhost:3001/register', { 
        email,
        password,
      });

      setSuccess('Registration successful!');
      console.log('Success:', response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong'); // Handle error response
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-page">
      <section className="signup-form-section">
        <h2 className="signup-form-title">Sign up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default SignupPage;