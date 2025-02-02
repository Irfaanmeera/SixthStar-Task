/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAllUsers, getUserStatistics } from '../api/adminApi';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data.users);
        setUsers(data.users);

        const statsData = await getUserStatistics();
        console.log('statsData:', statsData);
        setStatistics(statsData);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <p className="text-left text-xl font-bold">Dashboard</p>

      {/* Total Users Box */}
      <Card sx={{ boxShadow: 3, display: 'flex', alignItems: 'center', p: 2, mb: 3 }}>
        <PersonAddIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <CardContent>
          <Typography variant="h6" component="div">
            Total Users
          </Typography>
          <Typography variant="body1">{users.length}</Typography>
        </CardContent>
      </Card>

      <ul>
        {statistics.map(stat => (
          <li key={stat._id}>
            {stat._id}: {stat.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
