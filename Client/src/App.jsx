import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboardpage'
import Login from './Login'; // Ensure this path is correct
import Signup from './SIgnup'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} /> {/* Default route to Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;