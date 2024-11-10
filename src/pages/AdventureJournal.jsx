import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// Import Firebase functions for reading data from Firebase
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import JournalList from '../components/JournalList';
import NoteEditor from '../components/NoteEditor';

function AdventureJournal() {
  const [notes, setNotes] = useState([]);   // State for storing the list of notes fetched from Firebase
  const [showSaveNotification, setShowSaveNotification] = useState(false);   // State for controlling the visibility of the save notification
  const [notificationMessage, setNotificationMessage] = useState(''); // State for storing the notification message text

  useEffect(() => {   // This effect fetches notes from Firebase when the component is first loaded (mounted)
    // Create a reference to the 'notes' path in Firebase's Realtime Database
    const notesRef = ref(db, 'notes'); // `db` is the Firebase database object

    // Listen for changes to the 'notes' reference in Firebase and update the notes state
    onValue(notesRef, (snapshot) => { // `snapshot.val()` gets the actual data from Firebase
      const data = snapshot.val();
      const notesArray = []; // Convert the Firebase data (which is an object) into an array of notes
      for (let id in data) {
        notesArray.push({ id, ...data[id] });
      }
      // Update the state with the array of notes
      setNotes(notesArray);
    });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // This effect resets the notification when the journal page is shown
  useEffect(() => {
    setShowSaveNotification(false);
    setNotificationMessage('');
  }, []); // This runs only once when the component is mounted

  // Function to show a notification with a custom message
  const handleNotification = (message) => {
    setNotificationMessage(message);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  return (
    <div>
      {/* Render the save notification if it should be visible */}
      {showSaveNotification && (
        <div className="save-notification">
          <img src="/success.svg" alt="notification icon" className="notification-icon" />
          <p>{notificationMessage}</p>
        </div>
      )}

      {/* Set up routing for different pages */}
      <Routes>
        {/* Journal List Route */}
        <Route 
          path="/" 
          element={<JournalList notes={notes} />} // Pass notes as a prop to the JournalList component
        />
        
        {/* Note Editor Route */}
        <Route 
          path="note/:id" 
          element={<NoteEditor notes={notes} setNotification={handleNotification} />} // Pass notes and notification handler to NoteEditor
        />
      </Routes>
    </div>
  );
}

export default AdventureJournal;
