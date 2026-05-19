import {Routes, Route} from "react-router-dom";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProtectedRoute from "./Pages/auth/ProtectedRoute";
import Leads from "./Pages/leads/Leads";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute.tsx";
import Users from "./Pages/users/Users.tsx";
import Register from "./Pages/auth/Register";




function App() {
 
  return (
      <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          <Route path="/register" element={<Register />}/>
          <Route path="/leads" element={<ProtectedRoute><Leads/></ProtectedRoute>}></Route>
          <Route path="/users"element={ <ProtectedRoute> <RoleProtectedRoute allowedRoles={["admin"]}> <Users /> </RoleProtectedRoute></ProtectedRoute> }

          
/>
      </Routes>
    
  )
}

export default App
