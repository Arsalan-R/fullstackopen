import { useReducer, createContext } from "react"

const notificationReducer = (state, action) => {
    console.log(state);
    console.log(action);
  switch (action.type) {
    case 'SHOW': {
        return state = action.payload
    }
    case 'HIDE': return null
  }
}

const notificationContext = createContext()

export const NotificationContextProvidor = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <notificationContext.Provider value = {[notification, notificationDispatch]} >
            {props.children}
        </notificationContext.Provider>
    )
}

export default notificationContext