// Made by Benjamin
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getDatabase, ref, set, push, remove } from 'firebase/database'; // Firebase database functions
import PropTypes from 'prop-types'; // To enforce type-checking on props
import '../styles/components/NoteEditor.css'; 

const NoteEditor = ({ notes, setNotification }) => {
  const { id } = useParams(); // Get the note ID from the URL parameters
  const navigate = useNavigate(); // Used for navigation programmatically
  const [title, setTitle] = useState(''); // State to manage the title of the note
  const [content, setContent] = useState(''); // State to manage the content of the note
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the visibility of the delete confirmation modal
  const [loading, setLoading] = useState(true); // State to track loading status

  // Effect hook to initialize the title and content for an existing note or set loading state
  useEffect(() => {
    if (id !== 'new') {
      const note = notes.find(note => note.id === id); // Find the note by ID
      if (note) {
        setTitle(note.title); // Set the title if the note exists
        setContent(note.content); // Set the content if the note exists
      }
    }
    setLoading(false); // Set loading to false after the data is fetched or when there is no note
  }, [id, notes]); // This effect runs whenever `id` or `notes` changes

  // Function to return the current date and time in a formatted string
  const getFormattedDate = () => {
    const now = new Date();
    return `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString()}`;
  };

  // Function to save the note (create or update depending on the note ID)
  const saveNote = () => {
    const db = getDatabase();
    if (id === 'new') { // If the note is new
      const newNoteRef = push(ref(db, 'notes/')); // Create a reference for the new note
      set(newNoteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          setNotification('Note successfully created.'); // Notify the user about the successful creation
          navigate('/AdventureJournal'); // Redirect to the journal page
        })
        .catch(error => {
          console.error('Error saving new note', error); // Handle errors
        });
    } else { // If editing an existing note
      const noteRef = ref(db, `notes/${id}`); // Reference the note by its ID
      set(noteRef, {
        title,
        content,
        date: getFormattedDate(),
      })
        .then(() => {
          setNotification('Changes have been saved.'); // Notify the user about the successful update
          navigate('/AdventureJournal'); // Redirect to the journal page
        })
        .catch(error => {
          console.error('Error updating note: ', error); // Handle errors
        });
    }
  };

  // Function to delete the note
  const deleteNote = () => {
    const db = getDatabase();
    const noteRef = ref(db, `notes/${id}`); // Reference the note to be deleted
    remove(noteRef)
      .then(() => {
        setNotification(`${title} has been successfully deleted.`); // Notify the user about successful deletion
        navigate('/AdventureJournal'); // Redirect to the journal page
      })
      .catch(error => {
        console.error('Error deleting note: ', error); // Handle errors
      });
  };

  // Function to toggle the visibility of the delete confirmation modal
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal); // Toggle the modal visibility
  };

  // While the data is loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no notes are found or the note ID is invalid, display a message
  if (!notes || (id !== 'new' && !notes.find(note => note.id === id))) {
    return <p>Note not found</p>;
  }

  return (
    <div className="note-editor">
      {/* Editor header with back button and title */}
      <div className="editor-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src="/back.svg" alt="back button" />
        </button>
        
        <h2 className="note-title-display">{title || 'New Note'}</h2>
      </div>

      <div className="edit-note-container">
        {/* Note title input field */}
        <label htmlFor="note-title">Note Title</label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on change
          className="note-title"
          placeholder="Enter note title"
        />
        
        {/* Note content input field */}
        <label htmlFor="note-content">Note Entry</label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)} // Update content state on change
          className="note-content"
          placeholder="Enter note content"
        />
        
        {/* Save button that triggers note save */}
        <button onClick={saveNote} className="save-button">
          {id === 'new' ? 'Create' : 'Save'} {/* Change button text based on whether the note is new or existing */}
        </button>
        
        {/* Delete button for existing notes */}
        {id !== 'new' && (
          <button onClick={toggleDeleteModal} className="delete-button">
            <img src="/button-delete.svg" alt="delete icon" />Delete
          </button>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="delete-modal">
            <h2>Delete Entry</h2>
            <img
              className="close-modal-img"
              src="/close-modal.svg"
              alt="close modal"
              onClick={toggleDeleteModal} // Close the modal when clicking the close button
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

// Prop types validation
NoteEditor.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired, // Ensuring `notes` is an array of objects with specific properties
  setNotification: PropTypes.func.isRequired, // Function to set notification state in parent
};

export default NoteEditor;
