import { createSlice } from "@reduxjs/toolkit";


export const OtpPopupSlice = createSlice({
    name: 'otpPopup',
    initialState: false,
    reducers: {
        setOtpPopup: (_, action) => {
            return action.payload
        }
    }
})

export const { setOtpPopup } = OtpPopupSlice.actions
export default OtpPopupSlice.reducer