import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchMySubmissions } from "../../services/examService";
import "./Results.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Results() {
  const { token } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        if (!token) return;
        
        const submissionsData = await fetchMySubmissions(token);
        setResults(Array.isArray(submissionsData?.submissions) ? submissionsData.submissions : []);
      } catch (error) {
        console.error("Error loading results:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [token]);

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <span>Loading results...</span>
      </div>
    );
  }

  return (
    <div className="results">
      <div className="results__header">
        <h2>My Results</h2>
        <p>View your exam performance and scores</p>
      </div>

      <div className="results__list">
        {results.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No results available</h3>
            <p>Your exam results will appear here once you complete exams.</p>
          </div>
        ) : (
          results.map((result, index) => (
            <div
              key={result._id}
              className="result-card"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className="result-card__icon">📝</div>
              <div className="result-card__body">
                <div className="result-card__header">
                  <span className="result-card__title">{result.exam?.title || "Exam"}</span>
                  <span className={`result-card__badge badge--${result.status}`}>
                    {result.status === "published" ? "Published" : "Pending"}
                  </span>
                </div>
                <div className="result-card__meta">
                  <span className="result-card__meta-item">
                    Subject: {result.exam?.subject || "-"}
                  </span>
                  <span className="result-card__meta-item">
                    Completed: {formatDate(result.submittedAt)}
                  </span>
                  <span className="result-card__meta-item">
                    Total Marks: {result.maxScore || result.exam?.totalMarks || 0}
                  </span>
                </div>
                
                {result.published ? (
                  <div className="result-card__score">
                    <div className="result-card__score-bar">
                      <div
                        className="result-card__score-fill"
                        style={{ width: `${result.percentage || 0}%` }}
                      />
                    </div>
                    <div className="result-card__score-details">
                      <span className="result-card__score-text">
                        {result.totalMarks}/{result.maxScore || result.exam?.totalMarks || 0}
                      </span>
                      <span className="result-card__percentage">
                        {result.percentage || 0}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="result-card__pending">
                    <span>Result not yet published</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
