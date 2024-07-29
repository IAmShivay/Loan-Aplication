import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  GetDataAllApplications,
  GetDataResponse,
  RegisterAdminResponse,
} from "../../api/admin"; 

interface Credentials {
  Bank: string;
  comment: string;
  interestRate: any;
  isSubmitted: boolean;
  loanAmount: number;
  phoneNumber: string;
  status: string;
  user: string;
}

interface AdminState {
  adminData: any;
  loading: boolean;
  error: string | null;
  applications: any[] | null;
}

const initialState: AdminState = {
  adminData: null,
  loading: false,
  error: null,
  applications: null,
};

export const registerAdmin = createAsyncThunk(
  "admin/register",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await RegisterAdminResponse(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const adminResponse = createAsyncThunk(
  "admin/response",
  async (_: any, { rejectWithValue }) => {
    try {
      const response = await GetDataResponse();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllApplications = createAsyncThunk(
  "admin/getAllApplications",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await GetDataAllApplications();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(adminResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminResponse.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(adminResponse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllApplications.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.applications = action.payload;
        }
      )
      .addCase(
        getAllApplications.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default adminSlice.reducer;
