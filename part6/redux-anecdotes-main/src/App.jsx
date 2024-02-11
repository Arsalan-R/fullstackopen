import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useEffect } from 'react'
import { setAne } from './reducers/anecdoteReducer'
import aneService from './services/aneService'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    aneService.getAll()
    .then(anecdotes => {
      dispatch(setAne(anecdotes.data))})
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App