import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import termReducer from '../reducers/termReducer';

const store = configureStore({
    reducer:{
        term: termReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export default store;


