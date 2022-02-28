import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTerms } from '../axios/common_api/term_api';

const baseUrl = 'term/';

export const reduxFetchTerms = createAsyncThunk('term/fetchTerms', async (page, { rejectWithValue }) => {
    try {
        return await getTerms(baseUrl + '/?page=' + page.pos + '&size=' + page.size + '&sort=id,desc');
    } catch (err) {
        return rejectWithValue('Cannot get terms, try later or contat admin site!');
    }
})

export const termManager = createSlice({
    name: 'term',
    initialState: {
        data: [],
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(reduxFetchTerms.fulfilled, (state, action) => {
            const res = action.payload;
            console.log(res);
            if (res.status === 200) {
                state.data = res.data.content;
            }
        })
    },
})

export default termManager.reducer