<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionDashboard from "./QuestionDashboard";
import "./ExamAttempt.css";

const ExamAttempt = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Load questions
  useEffect(() => {
    setTimeout(() => {
      setQuestions([
        {
          _id: "q1",
          questionText: "What is Java?",
          options: ["Programming Language", "Database", "Operating System", "Browser"],
          correctAnswer: "Programming Language",
        },
        {
          _id: "q2",
          questionText: "Explain the concept of OOP in your notebook.",
          options: [], // theory
          keywords: ["object", "class", "method", "inheritance", "polymorphism"],
          totalPoints: 5,
        },
        {
          _id: "q3",
          questionText: "Which company developed Java?",
          options: ["Sun Microsystems", "Microsoft", "Google", "Apple"],
          correctAnswer: "Sun Microsystems",
        },
        {
          _id: "q4",
          questionText: "Define Polymorphism.",
          options: [], // theory
          keywords: ["object", "class", "method", "overloading", "overriding"],
          totalPoints: 5,
        },
        {
          _id: "q5",
          questionText: "What is ML?",
          options: [], // theory
          keywords: ["machine learning", "algorithm", "data", "model"],
          totalPoints: 5,
        },
        {
          _id: "q6",
          questionText: "What is React?",
          options: ["Library", "Framework", "Language", "Tool"],
          correctAnswer: "Library",
        },
        {
          _id: "q7",
          questionText: "What is a database?",
          options: [], // theory
          keywords: ["data", "storage", "table", "query", "sql"],
          totalPoints: 5,
        },
        {
          _id: "q8",
          questionText: "What is inheritance in OOP?",
          options: [], // theory
          keywords: ["object", "class", "inheritance", "parent", "child"],
        },
        {
          _id: "q9",
          questionText: "What is a function?",
          options: [], // theory  
          keywords: ["function", "input", "output", "code", "reusable"],
        },
        {
        _id: "q10",
        questionText: "What is an operating system?",
        options: ["Software", "Hardware", "Network", "Database"], // lowercase 'options'
        correctAnswer: "Software",
}
      ]);
      setLoading(false);
    }, 1000);
  }, [examId]);

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleTextChange = (questionId, text) => {
    setAnswers({ ...answers, [questionId]: text });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
  const resultData = {
    examId: examId,
    studentName: "Student 1",
    answers: answers,
    questions: questions,
    date: new Date().toLocaleString(),
  };

  // Save result so teacher can see
  localStorage.setItem(`result_${examId}`, JSON.stringify(resultData));

  navigate(`/result/${examId}`, { state: resultData });
};

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) return <p className="loading">Loading questions...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const q = questions[currentIndex];

  return (
    <div className="exam-container">
      <div className="exam-timer">Time Left: {formatTime(timeLeft)}</div>
      <div className="exam-flex-container">
        <div className="exam-main">
          <div className="exam-header">
            <h2>Exam: {examId}</h2>
            <p>Question {currentIndex + 1} of {questions.length}</p>
          </div>

          <div className="question-card">
            <h3 className="question-text">{q.questionText}</h3>

            <div className="options-container">
              {q.options.length > 0 ? (
                q.options.map((opt, i) => (
                  <label key={i} className={`option-label ${answers[q._id] === opt ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name={q._id}
                      checked={answers[q._id] === opt}
                      onChange={() => handleSelect(q._id, opt)}
                      className="radio"
                    />
                    {opt}
                  </label>
                ))
              ) : (
                <textarea
                  placeholder="Type your answer here..."
                  value={answers[q._id] || ""}
                  onChange={(e) => handleTextChange(q._id, e.target.value)}
                  rows={5}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              )}
            </div>

            <div className="nav-buttons">
              <button onClick={handlePrev} className={`nav-btn ${currentIndex===0 ? 'disabled':''}`}>Previous</button>
              {currentIndex===questions.length-1 ?
                <button onClick={handleSubmit} className="nav-btn submit-btn">Submit</button> :
                <button onClick={handleNext} className={`nav-btn ${!answers[q._id] ? 'disabled':''}`}>Next</button>
              }
            </div>
          </div>
        </div>

        <div className="exam-sidebar">
          <QuestionDashboard
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>cd frontens
      
    </div>
  );
};

export default ExamAttempt;
=======
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { submitExam } from "../services/examService";

export default function ExamAttempt({ exam, onComplete }) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentQuestion = exam.questions[currentQuestionIndex];

  const handleSubmit = useCallback(
    async (isAutoSubmit = false) => {
      if (submitted) return;

      if (!isAutoSubmit) {
        const confirmSubmit = window.confirm(
          "Are you sure you want to submit the exam?"
        );
        if (!confirmSubmit) return;
      }

      setLoading(true);
      try {
        const submissionData = {
          examId: exam._id,
          userId: user?._id,
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer,
          })),
        };

        await submitExam(submissionData, localStorage.getItem("token"));
        setSubmitted(true);
        if (!isAutoSubmit) alert("Exam submitted successfully!");
        onComplete();
      } catch (error) {
        console.error(error);
        alert("Submission failed");
      } finally {
        setLoading(false);
      }
    },
    [exam._id, answers, submitted, onComplete, user]
  );

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion._id]: value,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exam Attempt</h2>

      <p><strong>User:</strong> {user?.name || "Guest"}</p>
      <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>

      <hr />

      <h3>
        Question {currentQuestionIndex + 1} of {exam.questions.length}
      </h3>
      <p>{currentQuestion?.questionText}</p>

      {/* MCQ */}
      {currentQuestion?.type === "mcq" &&
        currentQuestion.options.map((opt, idx) => (
          <div key={idx}>
            <label>
              <input
                type="radio"
                name="answer"
                value={opt}
                checked={answers[currentQuestion._id] === opt}
                onChange={() => handleAnswerChange(opt)}
              />
              {opt}
            </label>
          </div>
        ))}

      {/* Text / Coding */}
      {(currentQuestion?.type === "text" ||
        currentQuestion?.type === "coding") && (
        <textarea
          rows="5"
          cols="50"
          placeholder="Write your answer..."
          value={answers[currentQuestion._id] || ""}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}

      <br /><br />

      <button
        onClick={() =>
          setCurrentQuestionIndex((prev) => prev - 1)
        }
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>

      <button
        onClick={() =>
          setCurrentQuestionIndex((prev) => prev + 1)
        }
        disabled={currentQuestionIndex === exam.questions.length - 1}
      >
        Next
      </button>

      <br /><br />

      <button onClick={() => handleSubmit(false)} disabled={loading}>
        {loading ? "Submitting..." : "Submit Exam"}
      </button>
    </div>
  );
}
>>>>>>> upstream/master
