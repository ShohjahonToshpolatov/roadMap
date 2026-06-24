// frontend/src/services/api.ts

import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — token qo'shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — xatolarni ushlash
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Auth API ====================
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// ==================== Quiz API ====================
export const quizAPI = {
  getAll: () => api.get('/quizzes'),
  getOne: (id: string) => api.get(`/quizzes/${id}`),
  create: (data: { title: string; category: string; description: string }) =>
    api.post('/quizzes', data),
  update: (id: string, data: any) => api.put(`/quizzes/${id}`, data),
  delete: (id: string) => api.delete(`/quizzes/${id}`),
};

// ==================== Question API ====================
export const questionAPI = {
  getByQuiz: (quizId: string) => api.get(`/questions/quiz/${quizId}`),
  create: (data: {
    quizId: string;
    questionText: string;
    options: string[];
    correctOption: string;
    topic: string;
  }) => api.post('/questions', data),
  update: (id: string, data: any) => api.put(`/questions/${id}`, data),
  delete: (id: string) => api.delete(`/questions/${id}`),
};

// ==================== Roadmap API ====================
export const roadmapAPI = {
  getMy: () => api.get('/roadmaps/my'),
  getOne: (id: string) => api.get(`/roadmaps/${id}`),
  create: (data: { category: string }) => api.post('/roadmaps', data),
  updateSteps: (id: string, stepsData: any) =>
    api.put(`/roadmaps/${id}/steps`, { stepsData }),
  delete: (id: string) => api.delete(`/roadmaps/${id}`),
};

export default api;