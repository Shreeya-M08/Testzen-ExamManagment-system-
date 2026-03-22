import axios from "axios";

const API = "http://localhost:4000/api";

export const getQuestionsByExamId = async (examId) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/questions/${examId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data; // ✅ perfect
};