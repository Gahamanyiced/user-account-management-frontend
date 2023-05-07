import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.get("users");
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectGetAllUsers = (state) => state.getAllUsers;
export default getAllUsersSlice.reducer;
