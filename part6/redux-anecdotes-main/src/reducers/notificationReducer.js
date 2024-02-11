import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'hi whats up',
    reducers : {
        voteNotification(state, action){
            return state = `You voted '${action.payload}'`
        },
        newAnecdoteNotification(state, action){
            return state = `You added '${action.payload}'`
        },
        removeNotification(){
            return null
        }
    }
})

export const {voteNotification, newAnecdoteNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer