import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

export const mediaLibrary = createSlice({
    name: 'mediaLibrary',
    initialState: {
        open: {
            status: false,
            func: () => {},
        },
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        openMediaLibrary: (state, action) => {
            console.log(action.payload);
            state.open.func = action.payload;
            state.open.status = true;

        },
        closeMediaLibrary: (state) => {
            state.open.status = false;
        }
    },
})
export const {openMediaLibrary, closeMediaLibrary} = mediaLibrary.actions;
export default mediaLibrary.reducer;