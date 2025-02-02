import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import UserList from "../pages/UsersList";
import Dashboard from "../pages/Dashboard";


const RoutePage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard/>}/>
          <Route path="users" element={<UserList />} />
         
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutePage;
