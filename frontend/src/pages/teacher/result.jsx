import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchExamResults, publishResult } from "../../services/examService";

export default function Results() {
  const { token } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        if (!token) return;
        
        // For now, we'll show empty state since we need exam results API
        setResults([]);
      } catch (error) {
        console.error("Error loading results:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [token]);

  const handlePublishResult = async (resultId) => {
    try {
      await publishResult(resultId, token);
      alert("Result published successfully!");
      // Reload results
    } catch (error) {
      console.error("Error publishing result:", error);
      alert("Failed to publish result. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <span>Loading results...</span>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <div className="dashboard__page-header">
        <h1 className="dashboard__page-title">Exam Results</h1>
        <p className="dashboard__page-sub">Manage and publish student exam results</p>
      </div>

      <div className="card">
        <div className="results-list">
          {results.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <h3>No exam results available</h3>
              <p>Results will appear here once students complete exams and submissions are graded.</p>
            </div>
          ) : (
            <div className="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Students</th>
                    <th>Average Score</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result._id || index}>
                      <td>{result.exam?.title || "N/A"}</td>
                      <td>{result.totalStudents || 0}</td>
                      <td>{result.averageScore || "N/A"}</td>
                      <td>
                        <span className={`status-badge ${result.published ? 'published' : 'draft'}`}>
                          {result.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        {!result.published && (
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handlePublishResult(result._id)}
                          >
                            Publish
                          </button>
                        )}
                        <button className="btn btn-sm btn-secondary">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
