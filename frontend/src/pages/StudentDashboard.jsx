import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import '../styles/auth.css'

const StudentDashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Student Dashboard</h2>
        <p>Welcome, student! Manage your exams and view results.</p>
        <button className="auth-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default StudentDashboard
