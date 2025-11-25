import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getModels = async () => {
  const response = await api.get('/models');
  return response.data;
};

export const getNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

export const postContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};