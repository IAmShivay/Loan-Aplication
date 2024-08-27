import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Register,Logout } from "../../api/authApi";
import { getToken ,clearToken,saveToken} from "../../utility/token";
import { RootState } from "../../store";
import { showSnackbar } from "../errors/errorSlice";
interface AuthState {
  user: string | "";
  token: string | "";
  isLoading: boolean;
  error: string | "";
  isAuthenticated: boolean;
  role: string | "";
}

const initialState: AuthState = {
  user: "",
  token: getToken(),
  isLoading: false,
  error: "",
  isAuthenticated: !!getToken(),
  role: "",
};

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await Logout(); // Assume this function handles server-side logout
      return null;
    } catch (error: any) {
      thunkAPI.dispatch(showSnackbar({ message: "Logout failed", severity: "error" }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await Login(credentials);
      saveToken(data?.token);
      return data;
    } catch (error: any) {
      thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const data = await Register(credentials);
      saveToken(data?.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = "";
      state.token = "";
      state.isAuthenticated = false;
      state.role = "";
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string; role: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.role = action.payload.user.role; // Assuming role is part of the response
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string; role: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.role = action.payload.user.role; // Assuming role is part of the response
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = "";
        state.token = null;
        state.isAuthenticated = false;
        state.role = "";
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
