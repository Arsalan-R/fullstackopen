import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'hi whats up',
    reducers : {
        showNotification(state, action){
            return state = action.payload
        },
        removeNotification(){
            return null
        }
    }
})

export const {showNotification, removeNotification} = notificationSlice.actions

export const setNotification = (notification, displayTime) => {
    return async (dispatch) => {
        dispatch(showNotification(notification))
        
        setTimeout(() => {
            dispatch(removeNotification())
          }, displayTime * 1000);
    }
}

export default notificationSlice.reducer