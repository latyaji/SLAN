import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {

  loginPhone : string
  loginPassword : string
  isLoggedin:boolean
  accesstoken : string | null

}

const initialState: LoginState = {
   
  loginPhone : "",
  loginPassword : "",
  isLoggedin : false,
  accesstoken:null
    
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
   
      setLoginPhone(state, action: PayloadAction<string>) {
        state.loginPhone = action.payload;
      },
      setLoginPassword(state, action: PayloadAction<string>) {
        state.loginPassword = action.payload;
      },
      setIsloggedin(state,action: PayloadAction<boolean>){
        state.isLoggedin = action.payload
      },
      setLogintoken(state, action: PayloadAction<string>) {
        state.accesstoken = action.payload;
      },
      clearLoginData(state) {
        return initialState;
      },
  },
});

export const { setLoginPhone, setLoginPassword,setIsloggedin,setLogintoken,clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
