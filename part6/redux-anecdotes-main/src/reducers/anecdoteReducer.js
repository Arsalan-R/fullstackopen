import { createSlice } from "@reduxjs/toolkit";
import aneService from "../services/aneService";

const aneSlice = createSlice({
  name: 'anecdote',
  initialState : [],
  reducers: {
    voting(state,action){
      const voteToAdd = state.find(ane => ane.id === action.payload.id)
      const newVote = {
        ...voteToAdd,
        votes : voteToAdd.votes + 1
      }
      const index = state.findIndex(ane => ane.id === action.payload.id)
      state[index] = newVote
    },
    createAne(state,action){
      state.push(action.payload)
    },
    setAne(state,action) {
      return action.payload
    }
  }
})

export const { voting, createAne,setAne, } = aneSlice.actions 

//6.16
export const initialization = () =>{
  return async (dispatch) => {
    const res = await aneService.getAll()
      dispatch(setAne(res.data))}
  }


//6.17
export const makeAnecdote = (content) => {
  return async (dispatch) =>{
        const newAnecdote = await aneService.create(content)
        dispatch(createAne(newAnecdote.data))
  }
}

export const voteAnecdote = (anecdote) => {
  const newAnecdote = { ...anecdote,
    votes : anecdote.votes + 1
  }
  return async (dispatch) =>{
    const res = await aneService.update(newAnecdote)
    dispatch(voting(res.data))
  }
}

export default aneSlice.reducer