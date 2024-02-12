import { createSlice } from "@reduxjs/toolkit";
import aneService from "../services/aneService";

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
      state.push(action.payload)
    },
    setAne(state,action) {
      return action.payload
    }
  }
})

//6.16
export const initialization = () =>{
  return async (dispatch) => {
    aneService.getAll()
    .then(anecdotes => {
      dispatch(setAne(anecdotes.data))})
  }
}


export const { voting, createAne,setAne, } = aneSlice.actions 
export default aneSlice.reducer