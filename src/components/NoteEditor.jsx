import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import PropTypes from 'prop-types';
import '../styles/components/NoteEditor.css';

function NoteEditor({ notes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Initialize title and content for existing note
  useEffect(() => {
    if (id !== 'new') {
      const note = notes.find(note => note.id === id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id, notes]);

  const getFormattedDate = () => {
    const now = new Date();
    return `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString()}`;
  };

  const saveNote = () => {
    const db = getDatabase();
    if (id === 'new') {
      const newNoteRef = push(ref(db, 'notes/'));
      set(newNoteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error saving new note: ', error);
        });
    } else {
      const noteRef = ref(db, `notes/${id}`);
      set(noteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error updating note: ', error);
        });
    }
  };

  const deleteNote = () => {
    const db = getDatabase();
    const noteRef = ref(db, `notes/${id}`);
    remove(noteRef)
      .then(() => {
        navigate('/AdventureJournal'); // Navigate back to journal list after deletion
      })
      .catch(error => {
        console.error('Error deleting note: ', error);
      });
  };

  // Check if the note exists before trying to render it
  if (!notes || (id !== 'new' && !notes.find(note => note.id === id))) {
    return <p>Note not found</p>;
  }

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        {id !== 'new' && (
          <button onClick={deleteNote} className="delete-button">Delete</button>
        )}
      </div>

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

// PropTypes for notes, but no setNotes since it's not used here anymore
NoteEditor.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoteEditor;
