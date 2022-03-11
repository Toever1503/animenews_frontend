import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mediaLibrary from "../reducers/mediaLibraryReducer";

const store = configureStore({
    reducer:{
        mediaLibrary: mediaLibrary
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export default store;
