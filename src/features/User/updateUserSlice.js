import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";
import { isAuthenticated } from "../../App";

export const updateUser = createAsyncThunk(
  "user/edit",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = isAuthenticated();
      const response = await http.patch(`/users/${id}`, data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [updateUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectUpdateUser = (state) => state.updateUser;
export default updateUserSlice.reducer;
