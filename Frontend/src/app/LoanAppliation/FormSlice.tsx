// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FormState {
//   name: string;
//   email: string;
//   phoneNumber: string;
//   age: string;
//   address: string;
//   education: string;
//   loanAmount: string;
//   tenthMarks: string;
//   twelfthMarks: string;
//   percentage: string;
//   bachelorCgpa: string;
//   university: string;
//   college: string;
// }

// const initialState: FormState = {
//   name: '',
//   email: '',
//   phoneNumber: '',
//   age: '',
//   address: '',
//   education: '',
//   loanAmount: '',
//   tenthMarks: '',
//   twelfthMarks: '',
//   percentage: '',
//   bachelorCgpa: '',
//   university: '',
//   college: '',
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     updateField: (state, action: PayloadAction<Partial<FormState>>) => {
//       return { ...state, ...action.payload };
//     },
//   },
// });

// export const { updateField } = formSlice.actions;
// export default formSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  // Basic details
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  address: string;
  education: string;
  loanAmount: string;
  // Academic details
  tenthMarks: string;
  twelfthMarks: string;
  percentage: string;
  bachelorCgpa: string;
  university: string;
  college: string;
  // Co-borrower details
  coBorrowerName: string;
  coBorrowerRelation: string;
  coBorrowerDob: string;
  coBorrowerIncome: string;
  coBorrowerPhone: string;
  // eKYC details
  ekycVerified: boolean;
  ekycDocuments: string[];
}

const initialState: FormState = {
  // Basic details
  name: '',
  email: '',
  phoneNumber: '',
  age: '',
  address: '',
  education: '',
  loanAmount: '',
  // Academic details
  tenthMarks: '',
  twelfthMarks: '',
  percentage: '',
  bachelorCgpa: '',
  university: '',
  college: '',
  // Co-borrower details
  coBorrowerName: '',
  coBorrowerRelation: '',
  coBorrowerDob: '',
  coBorrowerIncome: '',
  coBorrowerPhone: '',
  // eKYC details
  ekycVerified: false,
  ekycDocuments: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    updateCoBorrowerDetails: (state, action: PayloadAction<Partial<FormState>>) => {
      state.coBorrowerName = action.payload.coBorrowerName ?? state.coBorrowerName;
      state.coBorrowerRelation = action.payload.coBorrowerRelation ?? state.coBorrowerRelation;
      state.coBorrowerDob = action.payload.coBorrowerDob ?? state.coBorrowerDob;
      state.coBorrowerIncome = action.payload.coBorrowerIncome ?? state.coBorrowerIncome;
      state.coBorrowerPhone = action.payload.coBorrowerPhone ?? state.coBorrowerPhone;
    },
    updateEkycDetails: (state, action: PayloadAction<Partial<FormState>>) => {
      state.ekycVerified = action.payload.ekycVerified ?? state.ekycVerified;
      state.ekycDocuments = action.payload.ekycDocuments ?? state.ekycDocuments;
    },
  },
});

export const { updateField, updateCoBorrowerDetails, updateEkycDetails } = formSlice.actions;
export default formSlice.reducer;
