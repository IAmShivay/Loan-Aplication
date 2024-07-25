// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { GetDataResponse, RegisterAdminResponse } from '../../api/admin'; // Adjust the path according to your file structure

// interface Credentials {
//   Bank: string;
//   comment: string;
//   interestRate: any ;
//   isSubmitted: boolean;
//   loanAmount: number;
//   phoneNumber: string;
//   status: string;
//   user: string;
// }

// interface AdminState {
//   adminData: any;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AdminState = {
//   adminData: null,
//   loading: false,
//   error: null,
// };

// export const registerAdmin = createAsyncThunk(
//   'admin/register',
//   async (credentials: Credentials, { rejectWithValue }) => {
//     try {
//       const response = await RegisterAdminResponse(credentials);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const adminResponse = createAsyncThunk(
//   'admin/response',
//   async (__void, { rejectWithValue }) => {
//     try {
//       const response = await GetDataResponse();
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const adminSlice = createSlice({
//   name: 'admin',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.adminData = action.payload;
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default adminSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GetDataResponse, RegisterAdminResponse } from '../../api/admin'; // Adjust the path according to your file structure

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
}

const initialState: AdminState = {
  adminData: null,
  loading: false,
  error: null,
};

export const registerAdmin = createAsyncThunk(
  'admin/register',
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
  'admin/response',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await GetDataResponse();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
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
      });
  },
});

export default adminSlice.reducer;
