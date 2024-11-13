// Made by Benjamin
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/JournalList.css';

function JournalList({ notes }) { // Defining a functional component that takes `notes` as a prop.
  const [search, setSearch] = useState(''); // Setting up local state to manage the search input value.

  const filteredNotes = notes.filter(note =>  // Filtering the notes based on the search query, ensuring the title matches the search term (case-insensitive).
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="journal-list">
      <input
        type="text"
        placeholder="Search notes"
        value={search} // Binding the search input to the `search` state.
        onChange={e => setSearch(e.target.value)} // Updating the `search` state when the user types in the input.
        className="search-bar"
      />
      <div className="note-container">
        {notes.length === 0 ? (
          <p>No notes found. Create one!</p>
        ) : (
          filteredNotes.map(note => (
            <Link
              key={note.id || note.key} //fallback mechanism, ensures that each note has a unique key even if one property is missing
              to={`/AdventureJournal/note/${note.id}`} 
              className="note-link"
            >
              <div className="note">
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 120)}...</p> {/* This takes the first 120 characters of note.content. substring(0, 120) extracts characters from position 0 to position 120 (exclusive). */}

                <div className="journal-date">
                  <img src="cloud.svg" alt="cloudicon" />
                  <small>{note.date}</small>
                </div>
              </div>
            </Link>
          ))
        )}
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
