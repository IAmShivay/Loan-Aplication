import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  address: string;
  education: string;
  loanAmount: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phoneNumber: '',
  age: '',
  address: '',
  education: '',
  loanAmount: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;