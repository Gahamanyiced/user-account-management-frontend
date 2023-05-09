import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";
import { isAuthenticated } from "../../App";

export const verifyUser = createAsyncThunk(
  "user/edit",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.patch(`/users/${payload.id}`, payload.data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const verifyUserSlice = createSlice({
  name: "verifyUser",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [verifyUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [verifyUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectVerifyUser = (state) => state.verifyUser;
export default verifyUserSlice.reducer;
