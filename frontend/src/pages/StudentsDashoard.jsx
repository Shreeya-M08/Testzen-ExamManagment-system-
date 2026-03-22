import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../services/examService";

const StudentDashboard = () => {
const [exams, setExams] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const navigate = useNavigate();

useEffect(() => {
    getAllExams()
    .then((res) => {
        setExams(res); // because service returns res.data
        setLoading(false);
    })
    .catch(() => {
        setError("Failed to load exams");
        setLoading(false);
    });
}, []);

const handleStart = (examId) => {
    navigate(`/exam/${examId}`);
};

if (loading) return <p>Loading exams...</p>;
if (error) return <p>{error}</p>;
if (!exams.length) return <p>No exams available</p>;

return (
    <div style={{ padding: "20px" }}>
    <h2>Available Exams</h2>

    {exams.map((exam) => (
        <div key={exam._id} style={{ marginBottom: "15px" }}>
        <h3>{exam.title}</h3>
        <button onClick={() => handleStart(exam._id)}>
            Start Exam
        </button>
        </div>
    ))}
    </div>
);
};

export default StudentDashboard;