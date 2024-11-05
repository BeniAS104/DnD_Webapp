import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import JournalList from '../components/JournalList';
import NoteEditor from '../components/NoteEditor';

function AdventureJournal() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Kazaar Ruins', content: 'After a tense negotiation with the town’s mayor...', date: '17/10/2024' },
    { id: 2, title: 'The Cursed Village of Eldermoor', content: 'Eldermoor, a once-thriving town now cursed...', date: '17/10/2024' },
    { id: 3, title: 'The Shifting Labyrinth of Xal\'Tar', content: 'The Labyrinth seems unforgiving...', date: '17/10/2024' },
  ]);

  return (
    <Routes>
  <Route path="/" element={<JournalList notes={notes} />} />
  <Route path="note/:id" element={<NoteEditor notes={notes} setNotes={setNotes} />} /> {/* Ensure this is nested under AdventureJournal */}
</Routes>

  );
}

export default AdventureJournal;
