import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(personsUrl)
    return request.then(response => response.data)
  }

const create = name => {
    const request = axios.post(personsUrl, name)
    return request.then(Response => Response.data)
}

const remove = (id) => {
  return axios.delete(`${personsUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${personsUrl}/${id}`, newObject)
}
export default {getAll, create, remove, update}