import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const verifyOtp = createAsyncThunk(
  "Auth/verify-otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("auth/verify-otp", data);
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [verifyOtp.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [verifyOtp.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [verifyOtp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectVerifyOtp = (state) => state.verifyOtp;
export default verifyOtpSlice.reducer;
