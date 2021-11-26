import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const BtnRemove = ({ contact,handleRemove }) => {
  console.log("Render delete button for:", contact.name)
  const onClick = () => handleRemove(contact)
  return (
    <input type="button" value="delete" onClick={onClick}/>
  )
}

const Contacts = ({ contacts, handleRemove }) => {
  console.log("contacts =", contacts)
  return (
    <div>
      {contacts.map( contact => {
        return (
          <li key={contact.id}>
            <Contact contact={contact}  />
            <BtnRemove contact={contact} handleRemove={handleRemove}/>
          </li>)}
      )}
    </div>    
  )
  
}  

const Contact = ({ contact }) => 
  {console.log("contact =", contact)
  return (
    <>{contact.name} {contact.number} </>
  )  
}  


const Notification = ({ notificationMessage }) => {
  if (notificationMessage === null) return null
  console.log('Notification:',notificationMessage);
  
  const styleError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const styleSuccess = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  return (
    <div style={styleSuccess}>
      {notificationMessage}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const [ notificationMessage, setNotificationMessage] = useState(null)
  

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map( person => person.name)
    console.log(names);
    const pos = names.indexOf(newName)
    console.log(pos);
    if (pos === -1) {
      personsService
        .create({ 
          name: newName, 
          number: newNumber })
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('replace',newName);
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber}
        console.log('updatedPerson:',updatedPerson);
        const response = personsService.update(updatedPerson)
        console.log('update response: ', response);
        response.then(
          response => {
            console.log('update response: ', response)
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person: response))
          })
          .catch((err) => console.log(err.response.data))
    }
  }}

  const handleRemove = (contact) => {
    console.log('remove: ', contact.name);
    if (window.confirm(`Do you really want to delete ${contact.name}?`)) {
      personsService
        .remove(contact)
        .then(response => {
          console.log('delete:',response)
          //if (response.status !== 200) return 
          setPersons(persons.filter(person => person.id !== contact.id))
          displayMessage({message:`${contact.name} deleted.`})
        })
        .catch(error => {
          displayMessage({message:`${contact.name}  was already dfeleted from the server.`})
        })
      }
  }

  const displayMessage = ({ message }) => {
    const timeOut = 5000
    console.log('send message',message, 'for',timeOut,'ms');
    setNotificationMessage(message)
    console.log(notificationMessage);
    setTimeout(() => {
      setNotificationMessage(null)
    }, timeOut)
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

  useEffect(() => {
    console.log('Effect; fetch phonebook');
    personsService
      .getAll()
      .then(response => {
        console.log('Promise; phonebook response:',response);
        setPersons(response)
      })
  }
  ,[])

  console.log('NotifictionMessage:',notificationMessage);
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
      <Notification notificationMessage={notificationMessage} />
      <h2>Contacts</h2>
      <Contacts contacts={filterContacts()} handleRemove={handleRemove}/>

    </div>
  )
}

export default App