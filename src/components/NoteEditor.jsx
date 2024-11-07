import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push } from 'firebase/database';
import PropTypes from 'prop-types';
import '../styles/components/NoteEditor.css';

function NoteEditor({ notes, setNotes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Initialize title and content for existing note
  useEffect(() => {
    if (id !== 'new') {
      const note = notes.find(note => note.id === parseInt(id));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id, notes]);

  // Function to format the date and time
  const getFormattedDate = () => {
    const now = new Date();
    return `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString()}`;
  };

  // Function to save the note (create or update)
  const saveNote = () => {
    const db = getDatabase();
    if (id === 'new') {
      // Create a new note
      const newNoteRef = push(ref(db, 'notes/'));
      set(newNoteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          // Update local state (setNotes) after saving to Firebase
          setNotes(prevNotes => [
            ...prevNotes,
            {
              id: newNoteRef.key,  // New Firebase key
              title,
              content,
              date: getFormattedDate(),
            },
          ]);
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error saving new note: ', error);
        });
    } else {
      // Update an existing note
      const noteRef = ref(db, `notes/${id}`);
      set(noteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          // Update local state after saving the changes to Firebase
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note.id === parseInt(id)
                ? { ...note, title, content, date: getFormattedDate() }
                : note
            )
          );
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error updating note: ', error);
        });
    }
  };

  // Show a loading message if the note is not found
  if (!notes || (id !== 'new' && !notes.find(note => note.id === parseInt(id)))) {
    return <p>Note not found</p>;
  }

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title"
        placeholder="Enter note title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-content"
        placeholder="Enter note content"
      />
      <button onClick={saveNote} className="save-button">Save</button>
    </div>
  );
}

NoteEditor.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteEditor;
