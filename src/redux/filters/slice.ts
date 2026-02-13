import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterStatus = "all" | 'complete' | 'incomplete';

interface FilterState{
    status: FilterStatus;
    query: string;
};

const initialState: FilterState = {
    status: 'all',
    query: "",
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<FilterStatus>) {
            state.status = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        resetFilter(state) {
            state.status = 'all';
            state.query = '';
        }
    }
})

export const { setFilter, setQuery, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;