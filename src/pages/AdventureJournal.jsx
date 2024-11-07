import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ref, onValue } from 'firebase/database'; // Import onValue from firebase/database
import { db } from '../firebase'; // Only import db from firebase.js
import JournalList from '../components/JournalList';
import NoteEditor from '../components/NoteEditor';

function AdventureJournal() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from Firebase on component mount
  useEffect(() => {
    const notesRef = ref(db, 'notes'); // Use db directly without re-calling getDatabase()
    
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const notesArray = [];
      
      for (let id in data) {
        notesArray.push({ id, ...data[id] });
      }

      setNotes(notesArray);
    });

  }, []);

  return (
    <Routes>
      <Route path="/" element={<JournalList notes={notes} />} />
      <Route path="note/:id" element={<NoteEditor notes={notes} setNotes={setNotes} />} />
    </Routes>
  );
}

export default AdventureJournal;
