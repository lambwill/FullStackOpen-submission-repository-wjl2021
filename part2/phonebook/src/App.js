import React, { useState } from 'react'

const Filter = ( {value, onChange} ) => (
  <div>
    filter shown with <input value={value} onChange={onChange}/>
  </div>
)

const ContactForm = ( props ) => {

  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input 
                value={props.newName} 
                onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input 
                value={props.newNumber} 
                onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Contacts = ({ contacts }) => {
  console.log("contacts =", contacts)
  return (
    <div>
      {contacts.map( contact => <Contact contact={contact} key={contact.id}/>)}
    </div>    
  )
  
}  

const Contact = ( {contact} ) => 
{console.log("contact =", contact)
  return (
    <p>{contact.name} {contact.number}</p>
  )  
}  


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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

  const handleFilter = (event) => {
    console.log('filter value:',event.target.value)
    setFilter(event.target.value)
  }

  const filterContacts = () => {
    const filteredContacts = persons.filter( person => person.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0 )
    console.log( 'filteredContacts:', filteredContacts )
    return filteredContacts
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilter} />

      <h2>add a new</h2>
      <ContactForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Contacts</h2>
      <Contacts contacts={filterContacts()} />

    </div>
  )
}

export default App