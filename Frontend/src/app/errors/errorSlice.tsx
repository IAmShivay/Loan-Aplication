// src/slices/snackbarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<Omit<SnackbarState, "open">>) => {
      state.open = true;
      state.message = action.payload.message || "Ready";  // Ensure there's always a message
      state.severity = action.payload.severity || "info"; // Ensure there's always a severity
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;
export default snackbarSlice.reducer;
