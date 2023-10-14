import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserContext from "./components/ContextComponents/ContextComponents";

// headers
import Header from './components/Common/ManagementHeader/adminHeader';
import Footer from './components/Common/ManagementFooter/adminFooter';

// User management
import Index from './pages/Index/index';
import Login from './components/Auth/login';
import StaffHome from './pages/StaffHome/staffHome';
import ViewAllEmployee from './pages/Management/EmployeeDetails/AllEmployee';
import UpdateEmployee from './pages/Management/UpdateEmployees/updateEmployee';

// Management
import ManagementHome from './pages/Management/ManagementHome/ManagementHome';
import AddEmployee from './pages/Management/AddEmployees/addEmployees';


function App() {
  // user details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('User');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('User', JSON.stringify(user));
    } else {
      localStorage.removeItem('User');
    }
  }, [user]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header/>
          <Routes>
            {/* user management */}

            <Route path="" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/staffHome" element={<StaffHome />} />
            <Route path='/managerHome' element={<ManagementHome />} />
            <Route path='/addEmployees' element={<AddEmployee />} />
            <Route path='/allEmployees' element={<ViewAllEmployee/>} />
            <Route path='/updateEmployee/:id' element={<UpdateEmployee/>} />
          </Routes>
        </div>
        <Footer/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;