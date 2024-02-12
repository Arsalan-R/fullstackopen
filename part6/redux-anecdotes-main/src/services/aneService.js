import axios from 'axios'

const baseURI = 'http://localhost:3001/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
    const res = await axios.get(baseURI)
    return res
}

const create = async (newAnecdote) => {
    const objectAnecdote = asObject(newAnecdote)    
    const res = await axios.post(baseURI, objectAnecdote)
    return res
}

const update = async (anecdote) => {
  const res = await axios.put(`${baseURI}/${anecdote.id}`, anecdote)
  return res
}

export default {getAll, create, update}