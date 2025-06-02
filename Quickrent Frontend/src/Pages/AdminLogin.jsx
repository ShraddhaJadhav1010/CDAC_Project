import React from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import '../styles/Auth.css';

function AdminLogin() {
  return (
    <div className="auth-page">
      <AdminLoginForm />
    </div>
  );
}

export default AdminLogin;