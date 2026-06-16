import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import CustomerReducer from "../features/CustomerSlice";
import adminReducer  from "../features/AdminSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    Customer: CustomerReducer,
    admin: adminReducer,
  },
});