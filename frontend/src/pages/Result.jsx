import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Result.css";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultId } = useParams();

  const [data] = useState(() => {
    if (location.state) {
      return location.state;
    } else if (resultId) {
      const saved = JSON.parse(localStorage.getItem(`result_${resultId}`));
      if (saved) return saved;
      else {
        alert("Result not found!");
        navigate("/");
        return null;
      }
    } else {
      alert("Result not found!");
      navigate("/");
      return null;
    }
  });

  if (!data) return <p>Loading result...</p>;

  const { questions = [], answers = {} } = data;

  // Determine status per question
  const getStatus = (q) => {
    const ans = answers[q._id];
    if (!ans || ans.trim() === "") return "not-attempted";

    if (q.correctAnswer) {
      return ans === q.correctAnswer ? "correct" : "wrong";
    } else if (q.keywords && q.keywords.length > 0) {
      return ans.trim() === "" ? "not-attempted" : "wrong"; // theory: count as attempted but wrong by default
    }
    return "wrong";
  };

  // Total marks & obtained marks
  const totalMarks = questions.reduce((acc, q) => acc + (q.totalPoints || 1), 0);
  const obtainedMarks = questions.reduce((acc, q) => {
    if (q.correctAnswer) {
      return acc + ((answers[q._id] === q.correctAnswer) ? (q.totalPoints || 1) : 0);
    } else if (q.keywords && q.keywords.length > 0) {
      // For now, theory = 0 by default; manual marking can be added later
      return acc;
    }
    return acc;
  }, 0);

  const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
  const cgpa = ((obtainedMarks / totalMarks) * 10).toFixed(2);

  const correctCount = questions.filter((q) => getStatus(q) === "correct").length;
  const wrongCount = questions.filter((q) => getStatus(q) === "wrong").length;
  const notAttemptedCount = questions.filter((q) => getStatus(q) === "not-attempted").length;

  return (
    <div className="result-outer">
      <h2>Exam Result</h2>

      {/* Summary Box */}
      <div className="summary-box">
        <p>Total Questions: {questions.length}</p>
        <p>Correct: {correctCount}</p>
        <p>Wrong: {wrongCount}</p>
        <p>Not Attempted: {notAttemptedCount}</p>
        <p>Total Marks: {totalMarks}</p>
        <p>Marks Obtained: {obtainedMarks}</p>
        <p>Percentage: {percentage}%</p>
        <p>CGPA (out of 10): {cgpa}</p>
      </div>

      {/* Question-wise details */}
      <div className="result-inner">
        {questions.map((q, idx) => (
          <div key={q._id} className={`result-box ${getStatus(q)}`}>
            <strong>Q{idx + 1}:</strong> {q.questionText} <br />
            <strong>Your Answer:</strong> {answers[q._id] || "—"} <br />
            {q.correctAnswer && (
              <>
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </>
            )}
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
};

export default Result;