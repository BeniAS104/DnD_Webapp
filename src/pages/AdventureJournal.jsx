import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import JournalList from '../components/JournalList';
import NoteEditor from '../components/NoteEditor';

function AdventureJournal() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from Firebase on component mount
  useEffect(() => {
    const notesRef = ref(db, 'notes');
    
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const notesArray = [];
      
      for (let id in data) {
        notesArray.push({ id, ...data[id] });
      }

      setNotes(notesArray);
    });
  }, []); // Only run on mount, no need to fetch again on note save

  return (
    <Routes>
      <Route path="/" element={<JournalList notes={notes} />} />
      <Route path="note/:id" element={<NoteEditor notes={notes} setNotes={setNotes} />} />
    </Routes>
  );
}

export default AdventureJournal;
