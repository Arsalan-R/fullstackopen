import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newMutation = useMutation({
    mutationFn: makeAnecdote,
  onSuccess: (newAnecdote) => {
    console.log(newAnecdote);
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
  }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length > 5) {
    event.target.anecdote.value = ''
    newMutation.mutate({content})
    }
    else{
      alert('too few charachters')
    }
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
