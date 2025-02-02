import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import ChartUserGroup from '../components/ChartUserGroup'

const Dashboard: React.FC = () => {
  return (
    <>
    <div className='flex justify-between'>
    <AdminDashboard/>
    <ChartUserGroup/>
    </div>
    </>
  )
}

export default Dashboard