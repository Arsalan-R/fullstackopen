import { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './components/phonebook';
import personService from './services/person'
import {Success, Error} from './components/notifications'

const check = (newItem , list) =>{
  if (list.some(item => newItem.name === item.name || newItem.number === item.number)){
    return false
  }
  else{
    return true
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [nameSearch, setNameSearch] = useState([])
  const [successM, setSuccesM] = useState("")
  const [errorM, seterrorM] = useState("")

  useEffect(() => {
    personService
    .getAll()
    .then(names => {
      setPersons(names);
    })
}, [])

const addPerson = (event) =>{
  event.preventDefault()
  const addName = {
    name : newName,
    number : newNum,
    id : persons.length + 1
  }
  const checking = check(addName, persons)
  if (checking === true){
    personService
    .create(addName)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setSuccesM(`Added ${newPerson.name}.`)
      setTimeout(() => {
        setSuccesM("")
      }, 5000)
    })
  
  setNewName('')
  setNewNum('')
  }
  else{
    if (window.confirm(`${addName.name} is already added to the phonebook, replace the old number with the new one?`)){
    const repeatedPerson = persons.find(n => n.name === addName.name)
    const changedPerson = {...repeatedPerson, number : addName.number}
      personService.
      update(repeatedPerson.id, changedPerson)
      .then(Response => {
        console.log(Response); //Response.data has the changed data
        setPersons(persons.map(person => person.id !== repeatedPerson.id ? person : Response.data))
        setNewName('')
        setNewNum('')
      })
    }
  }
}

const nameChange = (event) => {
setNewName(event.target.value)
}

const numChange = (event) =>{
  setNewNum(event.target.value)
}

const search = (event) => {
  const searchThis = event.target.value
  if (searchThis === ''){
    setNameSearch([])
  }
  else{
  const searching = persons.filter(item => item.name.toUpperCase().startsWith(searchThis.toUpperCase()))
  setNameSearch(searching)
  }
}

const deleting = (deletedPerson) => {
  if(window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)){
  console.log(`change ${deletedPerson.id}`);
  personService
  .remove(deletedPerson.id)
  .then(() => {
    const remaining = persons.filter(person => person.id !== deletedPerson.id)
    setPersons(remaining)
  })
  .catch(error => {
    seterrorM(`${deletedPerson.name} has already been deleted.`)
    const remaining = persons.filter(person => person.id !== deletedPerson.id)
    setTimeout(() => {
      setPersons(remaining)
      seterrorM("")
    }, 5000); //add something cool
  })
}}

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successM} />
      <Error message={errorM} />
      <Filter changeFilter={search} nameSearch={nameSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} nameChange={nameChange} newNum={newNum} numChange={numChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={(deletedPerson) => deleting(deletedPerson)}/>
    </div>
  )
}


export default App