import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Widya Setyaningtyas', number: '081228135732' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Phonebook</h2>
      <form onSubmit={addPerson} className="mb-4">
        <div className="mb-2">
          Name: <input value={newName} onChange={handleNameChange} className="border p-1" />
        </div>
        <div className="mb-2">
          Number: <input value={newNumber} onChange={handleNumberChange} className="border p-1" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
      </form>
      <h2 className="text-xl font-semibold">Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
