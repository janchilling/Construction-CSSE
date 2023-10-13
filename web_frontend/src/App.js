import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Login from './components/login';
import ManagementHome from './pages/managementHome/managementHome';
import StaffHome from './pages/staffHome/staffHome';


function App() {
  // user details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* user management */}
          <Route path="/login" element={<Login />} />
          <Route path="/staffHome" element={<StaffHome />} />
          <Route path="/managementHome" element={<ManagementHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;