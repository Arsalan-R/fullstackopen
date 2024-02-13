import axios from 'axios'
const baseUrl= 'http://localhost:3003/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}