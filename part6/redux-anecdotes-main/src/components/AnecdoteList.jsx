import { useSelector, useDispatch } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
const Anecdotes = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const compareVotes = (a,b) => {
        return a.votes - b.votes
      }
      const sortedAnecdotes = anecdotes.sort(compareVotes) //6.5    

    const vote = (id) => {
        dispatch(voting(id))
      }

    return (
        <div>
            <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default Anecdotes