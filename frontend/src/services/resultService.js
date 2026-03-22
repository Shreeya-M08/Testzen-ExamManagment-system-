import axios from "axios";

const API = "http://localhost:4000/api";

export const getResultById = async (resultId) => {
const token = localStorage.getItem("token");

const res = await axios.get(`${API}/result/${resultId}`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
});

return res.data;
};