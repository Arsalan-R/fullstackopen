import { useDispatch } from "react-redux"
import { createAne } from "../reducers/anecdoteReducer"
import { newAnecdoteNotification, removeNotification } from "../reducers/notificationReducer"
import aneService from "../services/aneService"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await aneService.create(anecdote)
        console.log(newAnecdote);
        dispatch(createAne(newAnecdote.data))
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