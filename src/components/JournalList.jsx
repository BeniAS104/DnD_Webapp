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
          <Link key={note.id} to={`/AdventureJournal/note/${note.id}`} className="note-link">

            <div className="note">
              <h3>{note.title}</h3>
              <p>{note.content.substring(0, 100)}...</p>
              <small>{note.date}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

JournalList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JournalList;
