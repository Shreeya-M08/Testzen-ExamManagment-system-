import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import StudentDashboard from '../pages/StudentDashboard'
import TeacherDashboard from '../pages/TeacherDashboard'
import { getToken, getRole } from '../utils/auth'
import ExamAttempt from '../pages/ExamAttempt'
import Result from '../pages/Result'
import { CreateExam, ExamResults } from '../pages/createexam'
// import CreateExam from '../pages/CreateExam' // removed missing file

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

=======
import Home from '../pages/Home/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import StudentDashboard from '../pages/StudentDashboard'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import { getToken, getRole } from '../utils/auth'

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = getToken()
  const role = getRole()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return element
}
>>>>>>> upstream/master

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/student/dashboard"
<<<<<<< HEAD
        element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />}
      />
      <Route
        path="/teacher/dashboard"
        element={<ProtectedRoute element={<TeacherDashboard />} requiredRole="teacher" />}
      />
      <Route path="/create-exam" element={<CreateExam />} />
      <Route path="/exam-results" element={<ExamResults />} />
      <Route
  path="/exam/:examId"
  element={
    <ProtectedRoute
      element={<ExamAttempt />}
      requiredRole="student"
    />
  }
/>

<Route
  path="/result/:resultId"
  element={
    <ProtectedRoute
      element={<Result />}
      requiredRole="student"
    />
  }
/>


      <Route path="*" element={<Navigate to="/" replace />} />

=======
        element={<StudentDashboard />} 
      />
      <Route
        path="/teacher/dashboard"
        element={<TeacherDashboard />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> upstream/master
    </Routes>
  )
}

export default AppRoutes
