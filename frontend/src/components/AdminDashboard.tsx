import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { User } from "lucide-react";
import { getAllUsers } from "../api/adminApi";
import DepartmentTable from "./DepartmentTable";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Cards Row */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Card
          sx={{
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            p: 2,
            width: 250,
            height: 140,
          }}
        >
          <User size={28} color="blue" />
          <CardContent>
            <Typography variant="inherit" component="div">
              Total Users
            </Typography>
            <Typography variant="h6">{users.length}</Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            p: 2,
            width: 250,
            height: 140,
          }}
        >
          <User size={28} color="blue" />
          <CardContent>
            <Typography variant="inherit" component="div">
              Total Groups
            </Typography>
            <Typography variant="h6">4</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Department Table (Below Cards) */}
      <DepartmentTable />
    </Box>
  );
};

export default AdminDashboard;
