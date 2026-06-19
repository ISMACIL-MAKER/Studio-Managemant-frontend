import axios from "axios";

// Abuur Axios Instance
const API = axios.create({
  baseURL: "https://studio-managemant-backend.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🌟 MUHIIM: Tani waxay oggolaanaysaa in Cookies-ka HTTP-Only la isku weyddiisto Frontend iyo Backend
});

// 1. REQUEST INTERCEPTOR: Kahor intaan codsigu bixin, otomaatig u saar Token-ka (Kaga beddel 'token' hoos 'accessToken')
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 🌟 Waxaan u beddelnay 'accessToken' si uu ula jaanqaado magaca cusub
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR: Haddii token-ku dhaco, si qarsoon u cusboonaysii adoo isticmaalaya Refresh Token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🌟 CUSUB: Haddii uu Admin-ku bannaanka u tuuray isticmaalaha (Disabled User)
    if (error.response && error.response.data && error.response.data.error === "disabled_user") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userCustomer"); 
      window.location.href = "/"; 
      return Promise.reject(error);
    }

    // 🌟 AMNIGA CUSUB: Haddii backend-ku soo celiyo 401 oo ay farriintu tahay 'token_expired'
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error === "token_expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Ka hortag inuu loop aan dhammaad lahayn galo

      try {
        // 🌟 Wac endpoint-ka refresh token-ka si qarsoon (Cookie-ga ayaa si toos ah u raacaya)
        const response = await axios.post(
          "https://studio-managemant-backend.onrender.com/api/User/refresh",
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        // Ku kaydi token-ka cusub localStorage
        localStorage.setItem("accessToken", accessToken);

        // Ku sifeey codsigii hore token-ka cusub ee la soo dhalay
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Dib u dhoofi codsigii uu isticmaalahu markii hore rabay (Isagoo aan dareemin ayay xogtii u soo baxaysaa)
        return API(originalRequest);
      } catch (refreshError) {
        // Haddii xataa Refresh Token-kii uu dhaco (7 maalmood ka dib), hadda qofka toos u logout dheh
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userCustomer"); 
        window.location.href = "/"; 
        return Promise.reject(refreshError);
      }
    }

    // Haddii ay tahay cilad kale oo 401 ah (e.g. Token khaldan ama mid laga soo xaday browser kale)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userCustomer"); 
      window.location.href = "/"; 
    }

    return Promise.reject(error);
  }
);

export default API;