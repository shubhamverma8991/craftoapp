import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";

export const login = (username, otp) => axios.post(`${API_BASE_URL}/login`, { username, otp });

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("https://crafto.app/crafto/v1.0/media/assignment/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createQuote = (text, mediaUrl, token) =>
  axios.post(`${API_BASE_URL}/postQuote`, { text, mediaUrl }, { headers: { Authorization: `Bearer ${token}` } });

export const getQuotes = (limit, offset, token) =>
  axios.get(`${API_BASE_URL}/getQuotes`, {
    params: { limit, offset },
    headers: { Authorization: `${token}` },
  });
