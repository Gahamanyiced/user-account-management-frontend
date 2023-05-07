import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const forgotPassword = createAsyncThunk(
  "Auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post(`auth/forgot-password`, data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectforgotPassword = (state) => state.forgotPassword;
export default forgotPasswordSlice.reducer;
