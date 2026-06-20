import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../features/axiosInstance"; // 🌟 Hubi inuu saxan yahay path-ka axiosInstance-kaaga

// 1. Forgot Password Thunk
export const forgotPasswordThunk = createAsyncThunk(
  "password/forgotPassword",
  async ({ email }, thunkAPI) => {
    try {
      const response = await API.post("/User/forgotPassword", { email });
      return response.data; // Waxaa ka soo laabanaya backend-ka { message, resetURL }
    } catch (error) {
      const message = error.response?.data?.message || "Cillad ayaa dhacday";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. Reset Password Thunk
export const resetPasswordThunk = createAsyncThunk(
  "password/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await API.post(`/User/resetPassword/${token}`, { password });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Koodhku wuu dhacay ama waa khaldan yahay";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearPasswordStates: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FORGOT PASSWORD =================
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= RESET PASSWORD =================
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Password-ka si guul leh ayaa loo beddelay! 🎉";
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPasswordStates } = passwordSlice.actions;
export default passwordSlice.reducer;