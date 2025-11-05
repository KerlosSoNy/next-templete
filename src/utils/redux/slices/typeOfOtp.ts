import { createSlice } from "@reduxjs/toolkit";


export const typeOfOtpSlice = createSlice({
        name: 'typeOfOtp',
        initialState: null as string | null,
        reducers: {
            setTypeOfOtp: (_, action:any) => action.payload,
        },
    });

    export const {setTypeOfOtp} = typeOfOtpSlice.actions
    export default typeOfOtpSlice.reducer