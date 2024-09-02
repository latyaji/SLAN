import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignUpState {
  name : string
  phone : string
  password : string
  confirmPassword : string
  checked : boolean
  errorMessage: string; 
}

const initialState: SignUpState = {
    name : "",
    phone : "",
    password : "",
    confirmPassword : "",
    checked : false,
    errorMessage: "", 
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
        state.name = action.payload;
      },
      setPhone(state, action: PayloadAction<string>) {
        state.phone = action.payload;
      },
      setPassword(state, action: PayloadAction<string>) {
        state.password = action.payload;
      },
      setConfirmPassword(state, action: PayloadAction<string>) {
        state.confirmPassword = action.payload;
      },
      setChecked(state, action: PayloadAction<boolean>) {
        state.checked = action.payload;
      },
      setErrorMessage(state, action: PayloadAction<string>) {  // Add this reducer
        state.errorMessage = action.payload;
      },
      // clearSignupData(state) {
      //   return initialState;
      // },
  },
});

export const { setName, setPhone, setPassword, setConfirmPassword, setChecked,setErrorMessage,clearSignupData } = signupSlice.actions;
export default signupSlice.reducer;
