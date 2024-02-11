import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const aneSlice = createSlice({
  name: 'anecdote',
  initialState : anecdotesAtStart.map(asObject),
  reducers: {
    voting(state,action){
      const voteToAdd = state.find(ane => ane.id === action.payload)
      const newVote = {
        ...voteToAdd,
        votes : voteToAdd.votes + 1
      }
      const index = state.findIndex(ane => ane.id === action.payload)
      state[index] = newVote
    },
    createAne(state,action){
      const objectAne = asObject(action.payload)
      state.push(objectAne)
    }
  }
})

export const { voting, createAne } = aneSlice.actions 
export default aneSlice.reducer