import { useDispatch } from "react-redux"
import { createAne } from "../reducers/anecdoteReducer"
import { newAnecdoteNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAne(anecdote))
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