import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const resetPassword = createAsyncThunk(
  "Auth/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.patch(
        `auth/reset-password/${data.token}`,
        data.payload
      );
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [resetPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectResetPassword = (state) => state.resetPassword;
export default resetPasswordSlice.reducer;
