import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {

  loginPhone : string
  loginPassword : string
  isLoggedin:boolean
  accesstoken : string | null
  loader: boolean

}

const initialState: LoginState = {
   
  loginPhone : "",
  loginPassword : "",
  isLoggedin : false,
  accesstoken:null,
  loader : false
    
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
      setIsloading(state,action: PayloadAction<boolean>){
        state.loader = action.payload
      },
  },
});

export const { setLoginPhone, setLoginPassword,setIsloggedin,setLogintoken,clearLoginData,setIsloading } = loginSlice.actions;
export default loginSlice.reducer;
