import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/NoteEditor.css';

function NoteEditor({ notes, setNotes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find(note => note.id === parseInt(id));

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const saveNote = () => {
    const updatedNotes = notes.map(n => 
      n.id === parseInt(id) ? { ...n, title, content } : n
    );
    setNotes(updatedNotes); // This should update the notes in AdventureJournal
    navigate('/AdventureJournal'); // Navigating back to the journal list
  };

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-content"
      />
      <button onClick={saveNote} className="save-button">Save</button>
    </div>
  );
}

NoteEditor.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteEditor;
