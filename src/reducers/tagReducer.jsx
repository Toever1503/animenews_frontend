import { createSlice } from '@reduxjs/toolkit';

export const tagManager = createSlice({
    name: 'tagManager',
    initialState: {
        data: [],
        payload: null
    },
    reducers: {
        addTag: (state, action) => {
            action.payload
        },
        decrement: (state) => {
        },
        incrementByAmount: (state, action) => {
            console.log('payload=>')
            console.log(action)
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = tagManager.actions

export default tagManager.reducer