import { createSlice } from "@reduxjs/toolkit";
import { getDecryptedToken } from "../../functions/bufferedEncryptedToken";

export const getToken = async () => {
  try {
    const decryptedToken = await getDecryptedToken();
    return decryptedToken || null;
  } catch (error) {
    return null;
  }
};

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null, 
    isLoading: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    setTokenLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.isLoading = false;
    },
  },
});

export const { setToken, setTokenLoading,clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;

export const initializeToken = () => async (dispatch: any) => {
  dispatch(setTokenLoading(true));
  try {
    const token = await getToken();
    // dispatch(setToken(token));
  } catch (error) {
    console.error("Failed to initialize token:", error);
    dispatch(setToken(null));
  }
};