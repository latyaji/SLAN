import NetInfo from '@react-native-community/netinfo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NetworkState {
  isConnected: boolean;
}

const initialState: NetworkState = {
  isConnected: true,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = networkSlice.actions;
export default networkSlice.reducer;


// Setup network listener
export const initializeNetworkListener = () => (dispatch) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    dispatch(setConnectionStatus(state.isConnected));
  });

  // Cleanup the listener on unmount
  return () => unsubscribe();
};
