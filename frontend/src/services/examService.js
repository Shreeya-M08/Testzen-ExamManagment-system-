import axios from "axios";

const API = "http://localhost:4000/api";

export const getAllExams = async () => {
const token = localStorage.getItem("token");

const res = await axios.get(`${API}/exams/all`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
});

return res.data;
};