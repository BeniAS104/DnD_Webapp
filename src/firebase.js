// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update, remove } from 'firebase/database';

// Your web app's Firebase configuration (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDPB5eRVYAM6XxxEsmoUB062tjtas4SH6M",
  authDomain: "dnd-webapp-7f32c.firebaseapp.com",
  databaseURL: "https://dnd-webapp-7f32c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dnd-webapp-7f32c",
  storageBucket: "dnd-webapp-7f32c.firebasestorage.app",
  messagingSenderId: "1060054327998",
  appId: "1:1060054327998:web:d0919ee97c8faee1b2b4ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get reference to the Firebase Realtime Database
const db = getDatabase(app);

// Export functions to use in other parts of the app
export { db, ref, get, set, update, remove };
