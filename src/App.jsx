import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })

    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
    })
  }, [])
  console.log('render', notes.length, 'notes')
    

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(noteObject))
      setNewNote('')
    })

    noteService
      .create(noteObject)
      then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })


    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : not))
      })

    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
    
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id === id ? response.data : n))
    })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
    

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App