import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import App from './App'
import aneReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdote : aneReducer,
    filter: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)