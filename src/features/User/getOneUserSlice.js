import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";
import { isAuthenticated } from "../../App";

export const getOneUser = createAsyncThunk(
  "user/getOneUser",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = isAuthenticated();
      const response = await http.get(`users/${id}`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const getOneUserSlice = createSlice({
  name: "getOneUser",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [getOneUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [getOneUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [getOneUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectGetOneUser = (state) => state.getOneUser;
export default getOneUserSlice.reducer;
