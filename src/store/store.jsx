import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mediaLibrary from "../reducers/mediaLibraryReducer";
import React from "react";
const store = configureStore({
    reducer:{
        mediaLibrary: mediaLibrary
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export default store;
