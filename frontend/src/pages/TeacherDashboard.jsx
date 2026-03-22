import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import '../styles/auth.css'

const TeacherDashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Teacher Dashboard</h2>
        <p>Welcome, teacher! Create exams and review student performance.</p>
        <button className="auth-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default TeacherDashboard
