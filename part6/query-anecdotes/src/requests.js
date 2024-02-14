import axios from 'axios'
const baseUrl= 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const makeAnecdote = async (newAnecdote) => {
    if (newAnecdote.content.length > 5){
    newAnecdote.votes = 0
    newAnecdote.id = getId()
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
    } else {
        return Promise.reject();
    }
}

export const voteAnecdote = async (anecdote) => {   
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return res.data
}