import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'

import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import App from './App'
import aneReducer from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdote : aneReducer,
  filter: filterReducer
})
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)