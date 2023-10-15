import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserContext from "./components/ContextComponents/ContextComponents";

// headers
import Header from './components/Common/ManagementHeader/adminHeader';
import Footer from './components/Common/ManagementFooter/adminFooter';

// User management
import Index from './pages/Index/index';
import Login from './components/Auth/login';

// Staff
import StaffHome from './pages/Staff/StaffHome/staffHome';
import RequestedOrders from './pages/Staff/RequestedOrders/requestedOrders';
import ApprovedOrders from './pages/Staff/ApprovedOrders/approvedOrders';
import PendingOrders from './pages/Staff/PendingOrders/pendingOrders';
import RejectedOrders from './pages/Staff/RejectedOrders/rejectedOrders';
import UpdateStatus from './pages/Staff/StatusUpdate/statusUpdate';

// Management
import ManagementHome from './pages/Management/ManagementHome/ManagementHome';
import AddEmployee from './pages/Management/AddEmployees/addEmployees';
import ViewAllEmployee from './pages/Management/EmployeeDetails/AllEmployee';
import UpdateEmployee from './pages/Management/UpdateEmployees/updateEmployee';
import ManagementPendingOrders from './pages/Management/MgtPendingOrder/mgtPendingOrders';
import UpdatePendingStatus from './pages/Management/PendingStatusUpdate/pendingStatusUpdate';
import Orders from './pages/Management/Orders/order';
import AllocatedBudgets from './pages/Management/AllocatedBudgets/allocatedBudgets';

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

            {/* Staff */}
            <Route path="/staffHome" element={<StaffHome />} />
            <Route path="/requestedOrders" element={<RequestedOrders/>} />
            <Route path="/approvedOrders" element={<ApprovedOrders/>} />
            <Route path="/pendingOrders" element={<PendingOrders/>} />
            <Route path="/rejectedOrders" element={<RejectedOrders/>} />
            <Route path='/updateStatus/:id' element={<UpdateStatus/>} />

            {/* Management */}
            <Route path='/managerHome' element={<ManagementHome />} />
            <Route path='/addEmployees' element={<AddEmployee />} />
            <Route path='/allEmployees' element={<ViewAllEmployee/>} />
            <Route path="/ManagementpendingOrders" element={<ManagementPendingOrders/>} />
            <Route path='/updatePendingStatus/:id' element={<UpdatePendingStatus/>} />
            <Route path='/updateEmployee/:id' element={<UpdateEmployee/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/allocatedBudgets' element={<AllocatedBudgets/>} />

          </Routes>
        </div>
        <Footer/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;