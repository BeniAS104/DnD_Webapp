import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import JournalList from '../components/JournalList';
import NoteEditor from '../components/NoteEditor';

function AdventureJournal() {
  const [notes, setNotes] = useState([]);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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
  }, []);

  // Reset notification when journal page is shown
  useEffect(() => {
    setShowSaveNotification(false);
    setNotificationMessage('');
  }, []);

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000); // Hide after 2 seconds
  };

  return (
    <div>
      {/* Notification */}
      {showSaveNotification && (
        <div className="save-notification">
          <img src="/success.svg" alt="notification icon" className="notification-icon" />
          <p>{notificationMessage}</p>
        </div>
      )}

      <Routes>
        <Route 
          path="/" 
          element={<JournalList notes={notes} />} 
        />
        <Route 
          path="note/:id" 
          element={<NoteEditor notes={notes} setNotification={handleNotification} />} 
        />
      </Routes>
    </div>
  );
}

export default AdventureJournal;
