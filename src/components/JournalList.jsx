import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/JournalList.css';

function JournalList({ notes }) {
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="journal-list">
      <input
        type="text"
        placeholder="Search notes"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="note-container">
  {filteredNotes.map(note => (
    <Link 
      key={note.id}  // Ensure this is unique for every note
      to={`/AdventureJournal/note/${note.id}`} 
      className="note-link"
    >
      <div className="note">
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 120)}...</p>
        <div className="journal-date">
          <img src="cloud.svg" alt="cloudicon" />
          <small>{note.date}</small>
        </div>
      </div>
    </Link>
  ))}
</div>

      <div className='create-list'>
        <Link to="/AdventureJournal/note/new">
          <img src="create.svg" alt="" />
          <p>Create Log</p>
        </Link>
      </div>
    </div>
  );
}

JournalList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JournalList;
