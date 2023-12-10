const Filter = ({changeFilter, nameSearch}) => {
    return (
      <div>
          serach your phonebook: <input onChange={changeFilter}/>
          <ul>
            {nameSearch.map(found => <li key={found.id}>{found.name} {found.number}</li>)}
          </ul>
      </div>
    )
  }
  
  const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
          <div>
            name: <input value={props.newName} onChange={props.nameChange} required/>
          </div>
          <div>
            number <input value={props.newNum} onChange={props.numChange} required/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    )
  }
  
  const Persons = ({persons, deletePerson}) => {
    return (
      <ul>
          {persons.map(person => <li key={person.id}>
           {person.name} {person.number}
           <button onClick={() => deletePerson(person)}>Delete</button>
           </li>)}
      </ul>
    )
  }

  export {Filter, PersonForm, Persons}