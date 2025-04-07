import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
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

export async function signup(fullName, email, password) {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to sign up");
    }
    throw new Error("Network error. Please try again.");
  }
}

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Invalid credentials");
    }
    throw new Error("Network error. Please try again.");
  }
}

export async function getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Session expired. Please login again.");
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Failed to fetch user information.");
    }
  }

  export async function logout() {
    try {
      // Step 1: Call backend to invalidate session or cookie
      const response = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });
  
      // Step 2: Clear token from localStorage
      localStorage.removeItem("token");
  
      // Step 3: Clear all cookies (optional: if you’ve set any from frontend manually)
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to log out");
      }
      throw new Error("Network error. Please try again.");
    }
  }
  
