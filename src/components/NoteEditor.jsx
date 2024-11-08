import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import PropTypes from 'prop-types';
import '../styles/components/NoteEditor.css';

function NoteEditor({ notes, setNotification }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to track delete modal visibility

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
          // Trigger notification after new note is created
          setNotification('Note successfully created!');
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
          // Trigger notification after note is saved (edited)
          setNotification('Note saved successfully!');
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error updating note: ', error);
        });
    }
  };

  // Delete note function
  const deleteNote = () => {
    const db = getDatabase();
    const noteRef = ref(db, `notes/${id}`);
    remove(noteRef)
      .then(() => {
        navigate('/AdventureJournal');
      })
      .catch(error => {
        console.error('Error deleting note: ', error);
      });
  };

  // Toggle delete modal visibility
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
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
          <button onClick={toggleDeleteModal} className="delete-button">Delete</button>
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
      <button onClick={saveNote} className="save-button">
        {id === 'new' ? 'Create' : 'Save'}
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="delete-modal">
            <p>Are you sure you want to delete this note?</p>
            <button onClick={deleteNote} className="delete-confirm">Yes, delete</button>
            <button onClick={toggleDeleteModal} className="delete-cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// PropTypes for notes
NoteEditor.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setNotification: PropTypes.func.isRequired, // Function to set notification state in parent
};

export default NoteEditor;
