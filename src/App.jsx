import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

// Customer Pages
import CustomerList from "./pages/CustomerList";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";

// Employee Pages
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";


function App() {
  return (
    <Routes>

      {/* Default */}
      <Route 
        path="/" 
        element={<Register />} 
      />


      {/* Auth Routes */}
      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* Customer Routes */}
      <Route
        path="/customers"
        element={<CustomerList />}
      />

      <Route
        path="/customer/add"
        element={<AddCustomer />}
      />

      <Route
        path="/customer/edit/:id"
        element={<EditCustomer />}
      />


      {/* Employee Routes */}
      <Route
        path="/employees"
        element={<EmployeeList />}
      />

      <Route
        path="/employee/add"
        element={<AddEmployee />}
      />

      <Route
        path="/employee/edit/:id"
        element={<EditEmployee />}
      />


      {/* 404 */}
      <Route
        path="*"
        element={<Register />}
      />

    </Routes>
  );
}

export default App;