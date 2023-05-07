import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";
import { isAuthenticated } from "../../App";

export const updateUserId = createAsyncThunk(
  "user/edit",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = isAuthenticated();
      const response = await http.patch(`users/identifier-info/${id}`, data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const updateUserIdSlice = createSlice({
  name: "updateUserId",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [updateUserId.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [updateUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [updateUserId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectUpdateUserId = (state) => state.updateUserId;
export default updateUserIdSlice.reducer;
