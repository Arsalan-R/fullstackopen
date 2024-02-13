import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const newMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes =  queryClient.getQueryData(['anecdotes'])
      const index = anecdotes.findIndex(anecdote => anecdote.id === newAnecdote.id)
      const updatedAnecdote = [...anecdotes]
      updatedAnecdote[index] = newAnecdote
      queryClient.setQueryData(['anecdotes'], updatedAnecdote)
    }
  })

  const handleVote = (anecdote) => {  
    newMutation.mutate({...anecdote, votes : anecdote.votes + 1})
     
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>anecdotes are loading...</div>
  }
  
  if (result.isError) {
    return <div>Unfortunately the anecdote service is currently unavailable due to porblems in server</div>
  }

const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
