import { useState, useEffect } from 'react';
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


// Mock Discover and Matches components
const Discover = () => (
  <div className="discover-content">
    {/* <h3>Discover</h3>
    <p>Here you can discover new pals!</p> */}
  </div>
);

const Matches = () => (
  <div className="matches-content">
    {/* <h3>Matches</h3>
    <p>Here are your matched pals!</p> */}
  </div>
);

const FindPals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Discover'); // State to track the active component

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

  const userData = {
    name: "Londinius",
    username: "londibest04",
    age: 20,
    gender: "Man",
    pronouns: "he/him",
    location: "Aarhus, Denmark",
    aboutDnd: ["Experienced", "DM, Player", "Homebrew, 5E"],
    aboutMe: "Big fan of fantasy, storytelling, and all things D&D. I love building campaigns and diving into epic quests with a great group. Always up for meeting new people who are into creating wild characters and stories.",
    avatar: "https://via.placeholder.com/100" ,
    verify: "https://via.placeholder.com/100" ,
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

      {/* User Profile Section */}
      <div className="page-content">
      <div className="profile">
        <img src='avatar.svg' alt="User Avatar" className="avatar" />
        <img src='verify.svg' alt="verified icon" className='verify'/>

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
  <h3>I'm looking for</h3>
  <p>I'm looking for a group to join for weekly sessions, and I'm eager to try my hand at being the DM.</p>
</div>
</div>

      

      {/* Content section that swaps between Discover and Matches */}
      <div className="content">
        {activeTab === 'Discover' ? <Discover /> : <Matches />}
      </div>

      {/* Footer */}
      <footer className="footer">
        <button className="button pass"><img src="x.svg" alt="pass icon" />Pass</button>
        <hr className="divider" />
        <button className="button join"><img src="success.svg" alt="join icon" />Join</button>
      </footer>
    </div></div>
  );
};

export default FindPals;
