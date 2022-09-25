import React from 'react'
import PartyRequestContainer from '../../components/Admin/PartyRequestContainer'
import ClassesContainer from '../../components/Admin/ClassesContainer'
import CreateClassForm from '../../components/Admin/CreateClassForm';
import CreatePaintingForm from '../../components/Admin/CreatePaintingForm';

const AdminDashboard = () => {
  const addClass = () => {
    
  }
  return (
    <div>
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard">
        <PartyRequestContainer />
        <ClassesContainer />
        <CreateClassForm />
        <CreatePaintingForm />
      </div>
    </div>
  );
}

export default AdminDashboard