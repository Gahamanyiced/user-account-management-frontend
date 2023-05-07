import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const signup = createAsyncThunk(
  "Auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("auth/signup", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectSignup = (state) => state.signup;
export default signupSlice.reducer;
