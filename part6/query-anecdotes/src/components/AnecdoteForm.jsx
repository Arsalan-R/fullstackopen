import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeAnecdote } from "../requests"
import { useContext } from "react"
import notificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

const [notification, notificationDispatch] = useContext(notificationContext)

  const newMutation = useMutation({
    mutationFn: makeAnecdote,
  onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    notificationDispatch({
      type: 'SHOW',
      payload: `You added '${newAnecdote.content}'`
     })
     setTimeout(() => {
      notificationDispatch('HIDE')
     }, 5000);
  },
  onError: () =>{
    notificationDispatch({
      type: 'SHOW',
      payload: `Oops, that's not enough. Anecdotes need to have 6 or more characters.`
    })
    setTimeout(() => {
      notificationDispatch('HIDE')
     }, 5000);
  }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value   
    event.target.anecdote.value = ''
    newMutation.mutate({content}) 
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
