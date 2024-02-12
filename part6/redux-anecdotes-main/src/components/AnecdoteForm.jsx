import { useDispatch } from "react-redux"
import { makeAnecdote } from "../reducers/anecdoteReducer"
import { newAnecdoteNotification, removeNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(makeAnecdote(anecdote))
        dispatch(newAnecdoteNotification(anecdote))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm