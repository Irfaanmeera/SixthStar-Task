import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import ChartUserGroup from '../components/ChartUserGroup';


const Dashboard: React.FC = () => {
  return (
    <div>
      <p className="text-left text-2xl mb-10 font-bold">Dashboard</p>

      <div className="flex justify-between gap-4">
        <AdminDashboard />
        <ChartUserGroup />
      </div>
  
    </div>
  );
};

export default Dashboard;
