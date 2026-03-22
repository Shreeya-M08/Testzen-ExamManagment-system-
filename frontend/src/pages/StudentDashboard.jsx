<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken, getRole } from '../utils/auth'
import '../styles/auth.css'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching exams
    setTimeout(() => {
      const mockExams = [
        {
          _id: '1',
          examName: 'Java Basics Quiz',
          subject: 'Java Programming',
          totalQuestions: 5,
          totalMarks: 25,
          duration: 30,
          status: 'Available',
        },
        {
          _id: '2',
          examName: 'Python Advanced',
          subject: 'Python Programming',
          totalQuestions: 10,
          totalMarks: 50,
          duration: 45,
          status: 'Available',
        },
        {
          _id: '3',
          examName: 'Web Development',
          subject: 'Web Technologies',
          totalQuestions: 8,
          totalMarks: 40,
          duration: 60,
          status: 'Completed',
        },
      ]
      setExams(mockExams)
      setLoading(false)
    }, 500)
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const handleAttemptExam = (examId) => {
    navigate(`/exam/${examId}`)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <h2>Available Exams</h2>
        
        {loading ? (
          <p className="loading">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="no-exams">No exams available at the moment.</p>
        ) : (
          <div className="exams-grid">
            {exams.map((exam) => (
              <div key={exam._id} className="exam-card">
                <div className="exam-card-header">
                  <h3>{exam.examName}</h3>
                  <span className={`status-badge ${exam.status.toLowerCase()}`}>
                    {exam.status}
                  </span>
                </div>
                <p className="exam-subject">{exam.subject}</p>
                <div className="exam-details">
                  <span>📝 {exam.totalQuestions} Questions</span>
                  <span>⭐ {exam.totalMarks} Marks</span>
                  <span>⏱️ {exam.duration} min</span>
                </div>
                <button
                  className="attempt-btn"
                  onClick={() => handleAttemptExam(exam._id)}
                  disabled={exam.status === 'Completed'}
                >
                  {exam.status === 'Completed' ? 'Completed ✓' : 'Attempt Now'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          margin-bottom: 30px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .dashboard-header h1 {
          font-size: 32px;
          margin: 0;
        }

        .logout-btn {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .dashboard-content {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .dashboard-content h2 {
          color: white;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .loading, .no-exams {
          color: white;
          text-align: center;
          padding: 40px;
          font-size: 16px;
        }

        .exams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .exam-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .exam-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .exam-card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }

        .exam-card-header h3 {
          margin: 0;
          color: #333;
          font-size: 18px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.available {
          background-color: #d4edda;
          color: #155724;
        }

        .status-badge.completed {
          background-color: #cfe2ff;
          color: #084298;
        }

        .exam-subject {
          color: #666;
          margin: 10px 0;
          font-size: 14px;
        }

        .exam-details {
          display: flex;
          gap: 15px;
          margin: 15px 0;
          font-size: 13px;
          color: #666;
        }

        .attempt-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background-color: #667eea;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .attempt-btn:hover:not(:disabled) {
          background-color: #5568d3;
        }

        .attempt-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

export default StudentDashboard
=======
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Profile from "./Profile/Profile";
import Exams from "./Exams/Exams";
import Results from "./Results/Results";
import ExamAttempt from "./ExamAttempt";
import "../styles/dashboard.css";
import "../styles/Global.css";

const PAGE_META = {
  profile: {
    title: "My Profile",
    sub: "View and manage your personal & academic information",
  },
  exams: {
    title: "Examinations",
    sub: "Current exams, notices, and your submitted exam history",
  },
  results: {
    title: "My Results",
    sub: "Detailed scorecard and performance overview",
  },
};

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attemptingExam, setAttemptingExam] = useState(null);

  const meta = PAGE_META[activePage];

  const handleAttemptExam = (exam) => {
    setAttemptingExam(exam);
  };

  const handleExamComplete = () => {
    setAttemptingExam(null);
    setActivePage("exams"); // Return to exams page
  };

  if (attemptingExam) {
    return (
      <div className="dashboard">
        <ExamAttempt exam={attemptingExam} onComplete={handleExamComplete} />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard__main">
        <Navbar
          activePage={activePage}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />

        <main className="dashboard__content">
          <div className="dashboard__page-header">
            <h2 className="dashboard__page-title">{meta.title}</h2>
            <p className="dashboard__page-sub">{meta.sub}</p>
          </div>

          {activePage === "profile" && <Profile />}
          {activePage === "exams"   && <Exams onAttemptExam={handleAttemptExam} />}
          {activePage === "results" && <Results />}
        </main>
      </div>
    </div>
  );
}
>>>>>>> upstream/master
