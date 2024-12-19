import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DashboardPage.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Example for local storage
    setIsLoggedIn(false); // Update login state
    navigate('/login'); // Redirect to login page after logout
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Dashboard</h2>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        ) : (
          <button onClick={handleLoginRedirect} className="btn btn-primary">Login</button>
        )}
      </nav>
      {isLoggedIn ? (
        <>
          <div className="welcome-message">
            <h3>Welcome back, Rohit Kumar!</h3>
            <p>Here you can manage your account and view your information.</p>
          </div>
          <div className="user-info">
            <h4>Your Information</h4>
            <p><strong>Email:</strong> rjangra696@gmail.com</p>
            <p><strong>Phone:</strong> 7015204440</p>
            <p><strong>Location:</strong> Charkhi Dadri, Haryana, India</p>
            <p><strong>Education:</strong></p>
            <ul>
              <li>Master of Computer Application, MDU Campus, Rohtak (June 2022 - May 2024)</li>
              <li>Bachelor of Non-Medical Science, Chaudhary Bansi Lal University, Bhiwani (Graduated: October 2022)</li>
            </ul>
            <p><strong>Skills:</strong> Basics of Java, Core Java, OOP Concepts, Advanced Java, SQL, HTML, CSS, Microsoft Office, Communication Skills</p>
          </div>
          <div className="projects">
            <h4>Projects</h4>
            <ul>
              <li>Food Restaurant Website (Grilli) - September 2023 - November 2023</li>
              <li>Face Recognition App using Android Studio - November 2023 - January 2024</li>
              <li>Health Care Chatbot with AI and Python - January 2024 - March 2024</li>
              <li>Clone of Google Assistant (BESTEE) using Android Studio - March 2024 - June 2024</li>
              <li>My Creative Corner - Portfolio Website - January 2024</li>
            </ul>
          </div>
          <div className="actions">
            <h4>Actions</h4>
            <ul>
              <li><Link to="/profile">View Profile</Link></li>
              <li><Link to="/settings">Account Settings</Link></li>
              <li><Link to="/reports">View Reports</Link></li>
            </ul>
          </div>
        </>
      ) : (
        <div className="logout-message">
          <h3>You have been logged out. Please log in to access your dashboard.</h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;