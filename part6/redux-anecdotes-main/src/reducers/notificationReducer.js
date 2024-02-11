import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'hi whats up',
    reducers : {
        show(state, action){
            state = action.payload
        }
    }
})

export const {show} = notificationSlice.actions
export default notificationSlice.reducer