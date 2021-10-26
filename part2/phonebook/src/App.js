import React, { useState } from 'react'

const Numbers = ({ numbers }) => {
  console.log("numbers =", numbers)
  return (
    <div>
      {numbers.map( number => <Number number={number} key={number.id}/>)}
    </div>
  )
  
}

const Number = ( {number} ) => 
{console.log("number =", number)
  return (
    <p>{number.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map( person => person.name)
    console.log(names);
    const pos = names.indexOf(newName)
    console.log(pos);
    if (pos === -1) {
      setPersons(persons.concat({ name: newName, id:persons.length}))
    } else {
      window.alert(newName + " is already added to phonebook")
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons} />
      <div>debug: {newName}</div>
    </div>
  )
}

export default App