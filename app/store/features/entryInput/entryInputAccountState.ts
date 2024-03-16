import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';

interface EntryInputCategoryState {
    categoryId: number
}

const initialState: EntryInputCategoryState = {
    categoryId: -1,
}

export const entryInputCategorySlice = createSlice({
    name: 'entryInputCategory',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        }
    }
})

export const { setCategory } = entryInputCategorySlice.actions;

export const selectEntryInputCategory = (state: RootState) => state.entryInputCategory.categoryId;

export default entryInputCategorySlice.reducer;