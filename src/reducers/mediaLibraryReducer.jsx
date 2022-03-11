import { createSlice } from '@reduxjs/toolkit';


export const mediaLibrary = createSlice({
    name: 'mediaLibrary',
    initialState: {
        open: false,
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        openMediaLibrary: (state) => {
            state.open = true;
        },
        closeMediaLibrary: (state) => {
            state.open = false;
        }
    },
})
export const {openMediaLibrary, closeMediaLibrary} = mediaLibrary.actions;
export default mediaLibrary.reducer;