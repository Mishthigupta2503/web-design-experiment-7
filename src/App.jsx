import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill in both fields!')
      return
    }

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId
          ? { ...note, title, content }
          : note
      ))
      setEditId(null)
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content
      }
      setNotes([...notes, newNote])
    }

    setTitle('')
    setContent('')
  }

  function editNote(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note.id)
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="app">
      <header>
        <h1>Notes Corner ♡</h1>
        <p>A little space for all your thoughts ✨</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <button type="submit">
            {editId !== null ? 'Update Note' : 'Add Note +'}
          </button>
        </form>

        <h2>Your Notes 🐾</h2>

        <div className="notes-container">
          {notes.map(note => (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <button onClick={() => editNote(note)}>
                Edit
              </button>

              <button onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer>Made with ♡ and a little creativity</footer>
    </div>
  )
}

export default App