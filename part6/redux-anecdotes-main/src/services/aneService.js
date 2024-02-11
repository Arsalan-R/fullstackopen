import axios from 'axios'

const baseURI = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseURI)
    return res
}

export default {getAll}