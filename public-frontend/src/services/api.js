import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create an instance of axios with default headers
const apiClient = axios.create({
  baseURL: API_URL,
});

// Intercept requests to add the token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const fetchPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await apiClient.post("/login", userData);
  return response.data;
};

export const fetchUserProfile = async (token) => {
  const response = await apiClient.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
