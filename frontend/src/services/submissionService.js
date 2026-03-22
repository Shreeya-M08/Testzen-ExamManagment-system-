import axios from "axios";

const API = "http://localhost:4000/api";

export const submitExam = async (data) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/submit`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};