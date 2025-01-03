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

// Intercept responses to handle 401 errors or restrict based on role
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedAccess();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const handleUnauthorizedAccess = () => {
  // Clear the token and redirect to login if the user is not authorized
  localStorage.removeItem("token");
  alert(
    "Unauthorized access. Visitors are not allowed in Authors Dashboard. Please log in with appropriate permissions."
  );
  window.location.href = "/login";
};

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
  const { role } = response.data;

  if (role === "VISITOR") {
    handleUnauthorizedAccess();
    return null;
  }
  return response.data;
};

export const postComment = async (postId, commentData) => {
  const response = await apiClient.post(
    `/posts/${postId}/comments`,
    commentData
  );
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const createPost = async (postData) => {
  const author = await fetchUserProfile();
  const authorId = author.id;
  postData = { ...postData, authorId };
  console.log(postData);
  const response = await apiClient.post("/posts", postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const author = await fetchUserProfile();
  const authorId = author.id;
  postData = { ...postData, authorId };
  console.log(postData);
  const response = await apiClient.put(`/posts/${postId}`, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (isConfirmed) {
    try {
      const response = await apiClient.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  } else {
    console.log("Post deletion canceled.");
  }
};

export const updateComment = async (postId, commentId, data) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to update this comment?"
  );
  if (isConfirmed) {
    const response = await apiClient.put(
      `/posts/${postId}/comments/${commentId}`,
      data
    );
    window.alert("Comment updated");
    return response.data;
  } else {
    console.log("Post update canceled.");
  }
};

export const deleteComment = async (postId, commentId) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this comment?"
  );

  if (isConfirmed) {
    try {
      const response = await apiClient.delete(
        `/posts/${postId}/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  } else {
    console.log("Post deletion canceled.");
  }
};
