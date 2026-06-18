import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://studio-managemant-backend.onrender.com/api/User";

const initialState = {
  // 🌟 SAXID: Waxaan u beddelnay 'accessToken' si uu ula jaanqaado nidaamka cusub
  token: localStorage.getItem("accessToken") || null,
  // 🔥 LAGU DARAY: Ka soo dhex akhri localStorage-ka haddii uu jiro si aan xogtu u tirtirmin marka bogga la refresh-gareeyo
  userCustomer: JSON.parse(localStorage.getItem("userCustomer")) || null, 
  loading: false,
  error: null,
  successMessage: null,
};

export const LoginUser = createAsyncThunk("auth/LoginUser", async (userData, thunkAPI) => {
  try {
    const payload = {
      email: userData.email?.trim(),
      password: userData.password,
    };

    // 🌟 SAXID: Waxaan ku darnay 'withCredentials: true' si uu Cookie-ga qarsoon u oggolaado browser-ku
    const { data } = await axios.post(`${API_URL}/Login`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    // 🌟 SAXID: Waxaan ku kaydinaynaa 'accessToken' halkii ay ka ahayd 'token'
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("userCustomer", JSON.stringify(data.user)); 

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed. Please try again.",
    );
  }
});

export const RegisterStudio = createAsyncThunk(
  "auth/RegisterStudio",
  async (userData, thunkAPI) => {
    try {
      const payload = {
        username: userData.username?.trim(),
        email: userData.email?.trim(),
        password: userData.password,
      };

      const { data } = await axios.post(`${API_URL}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  },
);

const AuthSlice = createSlice({
  name: "auth", // 🔥 SAXIDDA: Waxaan ka dhignay xaraf yar si uu ula jaanqaado AdminSlice-kaaga

  initialState,

  reducers: {
    logout: (state) => {
      // 🌟 SAXID: Halkan ka sifeey 'accessToken'
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userCustomer"); // 🔥 LAGU DARAY
      state.token = null;
      state.userCustomer = null; // 🔥 LAGU DARAY
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        // 🌟 SAXID: Halkan wuxuu hadda qaadanayaa 'accessToken'-ka cusub ee backend-ku soo diray
        state.token = action.payload.accessToken;
        state.userCustomer = action.payload.user; // 🔥 KANI AYAA CILADDA SAXAY! Hadda React-ku wuxuu toos u arki doonaa role-ka
        state.successMessage = action.payload.message;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(RegisterStudio.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(RegisterStudio.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(RegisterStudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;