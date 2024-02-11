import { useSelector, useDispatch } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
import { voteNotification, removeNotification} from "../reducers/notificationReducer"

const Anecdotes = () => {

    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdote
      } else {
        const filtered = state.anecdote.filter(ane => ane.content.toUpperCase().includes(state.filter.toUpperCase()))
        console.log(filtered);
        return filtered
      }
    })
    const dispatch = useDispatch()

    
    const compareVotes = (a,b) => {
        return a.votes - b.votes
      }
      const sortedAnecdotes = [...anecdotes].sort(compareVotes) //6.5    

    const vote = (id, content) => {
        dispatch(voting(id))
        dispatch(voteNotification(content))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000);
      }

    return (
        <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default Anecdotes