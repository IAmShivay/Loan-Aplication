// src/app/LoanApplication/DocumentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  idProof: {
    uploaded: boolean;
    file: File | null;
  };
  addressProof: {
    uploaded: boolean;
    file: File | null;
  };
  incomeProof: {
    uploaded: boolean;
    file: File | null;
  };
}

const initialState: DocumentState = {
  idProof: {
    uploaded: false,
    file: null,
  },
  addressProof: {
    uploaded: false,
    file: null,
  },
  incomeProof: {
    uploaded: false,
    file: null,
  },
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    uploadDocument: (state, action: PayloadAction<{ type: keyof DocumentState; file: File }>) => {
      const { type, file } = action.payload;
      state[type].uploaded = true;
      state[type].file = file;
    },
    removeDocument: (state, action: PayloadAction<keyof DocumentState>) => {
      const type = action.payload;
      state[type].uploaded = false;
      state[type].file = null;
    },
    resetDocuments: () => initialState,
  },
});

export const { uploadDocument, removeDocument, resetDocuments } = documentSlice.actions;
export default documentSlice.reducer;