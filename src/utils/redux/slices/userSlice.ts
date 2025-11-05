'use client';
import { createSlice } from "@reduxjs/toolkit";

const getUser = () => {
    if (typeof window !== 'undefined') { // ✅ check if running in browser
        const user = localStorage.getItem("user");
        if (user && user !== 'undefined') {
            try {
                return JSON.parse(user);
            } catch {
                return null;
            }
        }
    }
    return null;
};


const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: getUser(),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", action.payload);
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
