import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const login = createAsyncThunk(
  "Auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("auth/login", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectLogin = (state) => state.login;
export default loginSlice.reducer;
