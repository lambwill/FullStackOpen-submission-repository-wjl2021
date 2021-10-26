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
    <p>{number.name} {number.number}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'040-1234567', id: 0 }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map( person => person.name)
    console.log(names);
    const pos = names.indexOf(newName)
    console.log(pos);
    if (pos === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber, id:persons.length}))
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log('newName:',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('newNumber:',event.target.value)
    setNewNumber(event.target.value)
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
          number: <input 
                  value={newNumber} 
                  onChange={handleNumberChange}/>
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