'use client'
import { configureStore } from "@reduxjs/toolkit";
import toast from './slices/toast';
import tokenSlice from './slices/tokenSlice';
import addressDialogSlice from './slices/addressDialog'
import userSlice from './slices/userSlice'
import cartSlice from './slices/cart'
import successfullyOrderedSlice from "./slices/successfullyOrdered";
import footerSlice from "./slices/footerSlice";
import typeOfOtpSlice  from "./slices/typeOfOtp";
import OtpPopupSlice  from "./slices/otpPopupSlice";

let store: AppStore | undefined;

export const makeStore = () => {
    return configureStore({
        reducer: {
            toast: toast,
            addressDialogSlice:addressDialogSlice,
            tokenSlice:tokenSlice,
            userSlice:userSlice,
            cart:cartSlice,
            successfullyOrderedSlice:successfullyOrderedSlice,
            footerSlice:footerSlice,
            typeOfOtpSlice:typeOfOtpSlice,
            OtpPopupSlice:OtpPopupSlice
        },
    });
}

export const getStore = () => {
  if (!store) {
    store = makeStore();
  }
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];