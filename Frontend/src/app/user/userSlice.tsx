import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {  GetUserDataResponse } from "../../api/userApi";
interface AdminState {
  userData: [] | any;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  userData: null,
  loading: false,
  error: null,
};

export const userResponse = createAsyncThunk(
  "user/response",
  async (_: any, { rejectWithValue }) => {
    try {
      const response = await GetUserDataResponse();
      console.log(response)
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userResponse.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(userResponse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
