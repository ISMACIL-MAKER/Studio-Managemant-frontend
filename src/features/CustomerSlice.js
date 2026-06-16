import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axiosInstance";
import axios, { Axios } from "axios";

// 1. GET CUSTOMER
export const getCustomer = createAsyncThunk(
  "Customers/getCustomer",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("Customer/List");
      return response.data; // Kani wuxuu soo celinayaa Array-ga macaamiisha
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// 2. ADD CUSTOMER
export const addCustomer = createAsyncThunk(
  "Customer/addCustomer",
  async (CustomerData, thunkAPI) => {
    try {
      const response = await API.post("/Customer/AddCustomer", CustomerData);
      alert("Customer Successfully Added ✅");
      return response.data; // Waxay soo celinaysaa { customer: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// 3. UPDATE CUSTOMER
export const updateCustomer = createAsyncThunk(
  "Customer/updateCustomer",
  async ({ id, customerData }, thunkAPI) => {
    try {
      const response = await API.put(`/Customer/Edit/${id}`, customerData);
      return response.data; // Waxay soo celinaysaa macmiilkii oo la beddelay
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// 4. DELETE CUSTOMER
export const deleteCustomer = createAsyncThunk(
  "Customer/deleteCustomer",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/Customer/Delete/${id}`);
      return id; // 🔥 Waxaan toos u soo celinaynaa ID-ga si filter-ku u helo
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// 🌟 5. ARCHIVE CUSTOMER (CUSUB)
export const archiveCustomer = createAsyncThunk(
  "Customer/archiveCustomer",
  async (id, thunkAPI) => {
    try {
      // Wuxuu wacayaa endpoint-ka backend-ka ee u xilsaaran archive-ka
      const response = await API.put(`/Customer/Archive/${id}`);
      return response.data; // Wuxuu soo celinayaa macmiilkii oo la rariyo { _id, isArchived: true, ... }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// SLICE-KA GUUD
const CustomerSlice = createSlice({
  name: "Customer",
  initialState: {
    customer: null,

    customers: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD CUSTOMER
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customers.push(action.payload.customer);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CUSTOMERS
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE CUSTOMER
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        // 🔥 Maadaama thunk-ku soo celiyey kaliya id, halkan toos ayaan u weidnaa action.payload
        state.customers = state.customers.filter(
          (c) => c._id !== action.payload,
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CUSTOMER
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map((c) =>
          c._id === action.payload._id ? action.payload : c,
        );
      })
      .addCase(archiveCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) //ADDACHIVE
      .addCase(archiveCustomer.fulfilled, (state, action) => {
        state.loading = false;
        // Map ayaan la dhex jafaynaa si macmiilka la archive-gareeyey loogu beddelo kan cusub ee backend-ka ka yimid
        state.customers = state.customers.map((c) =>
          c._id === action.payload._id ? action.payload : c,
        );
      })
      .addCase(archiveCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
     
  },
});

export default CustomerSlice.reducer;
