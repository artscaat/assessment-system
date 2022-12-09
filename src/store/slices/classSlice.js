import { createSlice } from "@reduxjs/toolkit"; 

const initailState = []

const classSlice = createSlice({
    name: 'class',
    initailState,
    reducers: {
        selectToClass: (state, action) => {
            state.push(action.payload)
            // console.log(state)
        },

    }
})

// Action creators

export const { selectToClass } = classSlice.actions;

// Reducer
export default classSlice.reducer;