import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import aneReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdote : aneReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })

  export default store