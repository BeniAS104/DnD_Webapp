import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import FindPalsModal from '../components/FindPalsModal';
import '../styles/FindPals.css';

const splitText = (text) => {
  return text.split(',').map((part, index) => (
    <span key={index}>
      {part}{index < text.split(',').length - 1 && ',' /* Adds the comma */}
      {index < text.split(',').length - 1 && <br />} {/* Adds <br> after each part except the last one */}
    </span>
  ));
};

const userData = {
  name: "Londinius",
  username: "londibest04",
  age: 20,
  gender: "Man",
  pronouns: "he/him",
  location: "Aarhus, Denmark",
  aboutDnd: ["Experienced", "DM, Player", "Homebrew, 5E"],
  aboutMe: "Big fan of fantasy, storytelling, and all things D&D. I love building campaigns and diving into epic quests with a great group. Always up for meeting new people who are into creating wild characters and stories.",
  avatar: "https://via.placeholder.com/100",
  verify: "https://via.placeholder.com/100",
};

// Mock Discover and Matches components
const Discover = ({ onJoinClick }) => (
  <div className="page-content">
    <div className="profile">
      <img src='avatar.svg' alt="User Avatar" className="avatar" />
      <img src='verify.svg' alt="verified icon" className='verify' />

      <div className="profile-data">
        <h2>{userData.name}</h2>
        <p className='username'>@{userData.username}</p>
        <p>Age: <span>{userData.age}</span></p>
        <p>Gender:  <span>{userData.gender}</span></p>
        <p>Pronouns:  <span>{userData.pronouns}</span></p>
        <div><img src="location.svg" alt="" /><p> {userData.location}</p></div>
      </div>
    </div>

    <div className="about">
      <h3>About D&D</h3>
      <ul className="list">
        <div>
          <img src="witch-hat.svg" alt="witch-hat" />
          <p>{splitText("Experienced")}</p>
        </div>
        <div>
          <img src="equipment.svg" alt="equipment" />
          <p>{splitText("DM,Player")}</p>
        </div>
        <div>
          <img src="dicey.svg" alt="dice" />
          <p>{splitText("Homebrew, 5E")}</p>
        </div>
      </ul>

      <div className="about-me">
        <h3>About Me</h3>
        <p>Big fan of fantasy, storytelling, and all things D&D. I love building campaigns and diving into epic quests with a great group. Always up for meeting new people who are into creating wild characters and stories.</p>
      </div>
      <div className="about-me">
        <h3>I&apos;m looking for</h3>
        <p>I&apos;m looking for a group to join for weekly sessions, and I&apos;m eager to try my hand at being the DM.</p>
      </div>
      <div className="about-me">
        <h3>Interests</h3>
        <div className='interests'>
          <span>Fantasy Literature</span>
          <span>Creative Writing</span>
          <span>Cosplay</span>
          <span>History</span>
          <span>Gaming</span>
          <span>Painting</span>
          <span>Swimming</span>
          <span>Reading</span>
        </div>
      </div>
      <div className="about-me">
        <h3>Spoken Languages</h3>
        <div className='interests'>
          <span>English</span>
          <span>Danish</span>
        </div>
      </div>
    </div>

    <div className="report">
      <button>Report User</button>
    </div>
    {/* Footer */}
    <footer className="footer">
      <button className="button pass"><img src="x.svg" alt="pass icon" />Pass</button>
      <hr className="divider" />
      <button className="button join" onClick={onJoinClick}><img src="success.svg" alt="join icon" />Join</button>
    </footer>
  </div>
);

// Add prop types validation for the Discover component
Discover.propTypes = {
  onJoinClick: PropTypes.func.isRequired, // Validate onJoinClick as a required function
};

const Matches = () => (
  <div className="matches-content">
    <div className='no-groups'><p>Players and Groups you matched with will appear here.</p>
      <p>Head over to the <span>Discover</span> tab to find players and groups to join.</p>
    </div>
  </div>
);

const FindPals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Discover'); // State to track the active component
  const [showPopUp, setShowPopUp] = useState(false); // State for the pop-up

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsModalVisible(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsModalVisible(false);
  };

  const handleJoinClick = () => {
    setShowPopUp(true); // Show the pop-up
    setTimeout(() => {
      setShowPopUp(false); // Hide it after 2 seconds
    }, 2000);
  };

  return (
    <div>
      {isModalVisible && <FindPalsModal onClose={handleCloseModal} />}
      
      {/* Upper division with tab buttons */}
      <div className='upper-division'>
        <div className="divide">
          <div 
            onClick={() => setActiveTab('Discover')} 
            className={`tab ${activeTab === 'Discover' ? 'active' : ''}`}
          >
            Discover
          </div>
          <div 
            onClick={() => setActiveTab('Matches')} 
            className={`tab ${activeTab === 'Matches' ? 'active' : ''}`}
          >
            Matches
          </div>
        </div>
      </div>

      {/* Show pop-up message when the Join button is clicked */}
      {showPopUp && (
        <div className="popup-message">
          <img src="success.svg" alt="success" />
          <p>You&apos;ve shown interest!</p>
        </div>
      )}

      <div className="content">
        {activeTab === 'Discover' ? <Discover onJoinClick={handleJoinClick} /> : <Matches />}
      </div>
    </div>
  );
};

export default FindPals;
