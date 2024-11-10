// Inspiration.jsx
import { useEffect, useState } from 'react';
import InspirationCard from '../components/InspirationCard.jsx';
import '../styles/Inspiration.css';

const InspirationsPage = () => {
  const [inspirations, setInspirations] = useState([]);

  // Fetch JSON data from external link
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/MartiBL/JSONforgames-crudproject/refs/heads/main/inspirations%20(1).json') // Replace with actual link ID
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Debugging line
        if (Array.isArray(data)) {
          setInspirations(data);
        } else if (data.inspirations) {
          setInspirations(data.inspirations); // Adjust if JSON structure is different
        } else {
          console.error("Unexpected data structure:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="inspirations-page">
      <div className="search-sort-section">
        <input type="text" placeholder="Search" className="search-bar" />
        <select className="sort-select">
          <option>Sort by</option>
          {/* Add other sort options */}
        </select>
        <div className="filter-buttons">
          <button>All</button>
          <button>Character</button>
          <button>World</button>
          <label>
            <input type="checkbox" /> NSFW
          </label>
        </div>
      </div>
      <div className="inspirations-grid">
        {inspirations.length > 0 ? (
          inspirations.map((inspiration, index) => (
            <InspirationCard 
              key={index} 
              src={inspiration.src} 
              title={inspiration.title} 
              username={inspiration.username} 
            />
          ))
        ) : (
          <p>No inspirations to show</p>
        )}
      </div>
      <footer className="footer">
        <button className="create-post-btn">Create Post</button>
      </footer>
    </div>
  );
};

export default InspirationsPage;
