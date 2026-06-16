import axios from "axios";

// Abuur Axios Instance
const API = axios.create({
  baseURL: "https://studio-managemant-backend.onrender.com/api", // 👈 Halkaan guri URL-ka API-gaaga backend-ka
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. REQUEST INTERCEPTOR: Kahor intaan codsigu bixin, otomaatig u saar Token-ka
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ama meesha aad adigu ku kaydsato token-ka
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR: Haddii backend-ku soo celiyo 401 (Token Dhacay), toos u logout dheh
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token-kii waa dhacay ama waa la beddelay -> Nidaamka ka saar qofka
      localStorage.removeItem("token");
      localStorage.removeItem("userCustomer"); 
      
      // Ku celis bogga hore si uu browser-ku u refresh-garoobo state-kuna u nadiifo
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default API;