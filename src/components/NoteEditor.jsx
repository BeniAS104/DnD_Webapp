import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import PropTypes from 'prop-types';
import '../styles/components/NoteEditor.css';

const NoteEditor = ({ notes, setNotification }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize title and content for existing note
  useEffect(() => {
    if (id !== 'new') {
      const note = notes.find(note => note.id === id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
    setLoading(false);
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
          setNotification('Note successfully created.');
          navigate('/AdventureJournal');
        })
        .catch(error => {
          console.error('Error saving new note', error);
        });
    } else {
      const noteRef = ref(db, `notes/${id}`);
      set(noteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          setNotification('Changes have been saved.');
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
        setNotification(`${title} has been successfully deleted.`);
        navigate('/AdventureJournal');
      })
      .catch(error => {
        console.error('Error deleting note: ', error);
      });
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!notes || (id !== 'new' && !notes.find(note => note.id === id))) {
    return <p>Note not found</p>;
  }

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src="/back.svg" alt="back button" />
        </button>
        
        <h2 className="note-title-display">{title || 'New Note'}</h2>
      </div>

      <div className="edit-note-container">
        <label htmlFor="note-title">Note Title</label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title"
          placeholder="Enter note title"
        />
        <label htmlFor="note-content">Note Entry</label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-content"
          placeholder="Enter note content"
        />
        <button onClick={saveNote} className="save-button">
          {id === 'new' ? 'Create' : 'Save'}
        </button>
        {id !== 'new' && (
          <button onClick={toggleDeleteModal} className="delete-button">
            <img src="/button-delete.svg" alt="delete icon" />Delete
          </button>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="delete-modal">
            <h2>Delete Entry</h2>
            <img
              className="close-modal-img"
              src="/close-modal.svg"
              alt="close modal"
              onClick={toggleDeleteModal}
            />
            <p>Are you sure you want to delete <span>{title}</span>?</p>
            <p>You will not be able to recover it.</p>
            <div>
              <button onClick={deleteNote} className="delete-confirm">Yes, delete</button>
              <button onClick={toggleDeleteModal} className="delete-cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
