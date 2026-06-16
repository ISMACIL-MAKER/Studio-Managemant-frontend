import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "./axiosInstance";

// 🔥 GET ADMIN STATS
export const getAdminStats = createAsyncThunk(
  "admin/getAdminStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await API.get("/Admin/Stats");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

export const getAllStudios = createAsyncThunk(
  "admin/getAllStudios",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await API.get("/Admin/Studios");
      return response.data; // Wuxuu soo celinayaa array oo ay ku jiraan dhammaan studios-ka
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

export const toggleStudioStatus = createAsyncThunk(
  "admin/toggleStudioStatus",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await API.put(`/Admin/Studios/Toggle/${id}`, {});
      return response.data.user; // Wuxuu soo celinayaa user-ka isbeddelay
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

export const deleteStudio = createAsyncThunk(
  "admin/deleteStudio",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await API.delete(`/Admin/Studios/Delete/${id}`);
      return response.data.id; // Wuxuu soo celinayaa ID-gii la tirtiray
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

const AdminSlice = createSlice({
  name: "admin",

  initialState: {
    totalStudios: 0,
    totalCustomers: 0,
    activeStudios: 0,
    inactiveStudios: 0,
    studios: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.loading = false;

        // Halkan waxaan u xaqiijinaynaa haddii uu jiro action.payload
        state.totalStudios = action.payload ? action.payload.totalStudio : 0;
        state.totalCustomers = action.payload
          ? action.payload.totalCustomers
          : 0;
        state.activeStudios = action.payload ? action.payload.activeStudios : 0;
        state.inactiveStudios = action.payload
          ? action.payload.inactiveStudios
          : 0;
      })

      .addCase(getAdminStats.rejected, (state, action) => {
        // Haddii uu error dhacay halkan ayay ku tusi doontaa
        console.log("Redux waa la diiday (Error):", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllStudios.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudios.fulfilled, (state, action) => {
        state.loading = false;
        state.studios = action.payload || []; // Xogta array-ga ah halkan ayay fariisanaysaa
      })
      .addCase(getAllStudios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(toggleStudioStatus.fulfilled, (state, action) => {
        const index = state.studios.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.studios[index] = action.payload; // Waxaynu cusboonaysiinay studio-gaas oo kaliya
        }
        // Cusboonaysii nambarada metric-ka si aysan u khalkhalin bogga hore
        state.activeStudios = state.studios.filter((s) => s.isActive).length;
        state.inactiveStudios = state.studios.filter((s) => !s.isActive).length;
      })
      // DELETE STUDIO
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.studios = state.studios.filter((s) => s._id !== action.payload);
        state.totalStudios -= 1;
        state.activeStudios = state.studios.filter((s) => s.isActive).length;
        state.inactiveStudios = state.studios.filter((s) => !s.isActive).length;
      });
  },
});

export default AdminSlice.reducer;
