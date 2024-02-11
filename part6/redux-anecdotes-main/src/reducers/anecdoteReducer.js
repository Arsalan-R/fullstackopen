import { createSlice } from "@reduxjs/toolkit";

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
  initialState : [],
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
    },
    setAne(state,action) {
      return action.payload
    }
  }
})

export const { voting, createAne,setAne } = aneSlice.actions 
export default aneSlice.reducer