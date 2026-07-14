import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/CustomerList";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <Routes>
      {/* Default Route */}
  
      <Route path="/home" element={<Register />} > </Route>
      
      {/* Register */}
      <Route path="/register" element={<Register />} />

      Login
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customer/add" element={<AddCustomer />} />
      <Route path="/customer/edit/:id" element={<EditCustomer />} />

      <Route
          path="/employee/add"
          element={<AddEmployee />}
        />

        <Route path="/employees" element={<EmployeeList />} />

          <Route
          path="/employee/edit/:id"
          element={<EditEmployee />}
        />
    </Routes>
  );
}

export default App;