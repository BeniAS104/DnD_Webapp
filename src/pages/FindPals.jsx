import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FindPalsModal from '../components/FindPalsModal';
import '../styles/FindPals.css';

// Sample data for users and groups
const profilesData = [
  {
    id: 1,
    type: 'user',
    name: "Londinius",
    username: "londibest04",
    age: 20,
    gender: "Man",
    pronouns: "he/him",
    location: "Aarhus, Denmark",
    aboutDnd: ["Experienced", "DM, Player", "Homebrew, 5E"],
    aboutMe: "Big fan of fantasy, storytelling, and all things D&D. I love building campaigns and diving into epic quests with a great group. Always up for meeting new people who are into creating wild characters and stories.",
    Looking: "I'm looking for a group to join for weekly sessions, and I'm eager to try my hand at being the DM.",
    avatar: "/avatar.svg",
    verify: "/verify.svg",
    interests: ["Fantasy Literature", "Creative Writing", "Cosplay", "History", "Gaming", "Painting", "Swimming", "Reading"],
    languages: ["English", "Danish"],
  },
  {
    id: 2,
    type: 'group',
    name: "The Shadowed Keepers",
    location: "Aarhus, Denmark",
    aboutDnd: ["In Person", "Puzzle-heavy", "Homebrew, 5E"],
    description: [
      "A close-knit party of adventurers who thrive on stealth, lore, and a touch of dark humor.",
      "We’re running a long-term campaign based on mystery and intrigue, with a mix of classic dungeon crawls and intense roleplay moments.",
      "Our members value creativity and commitment to character arcs, and we’re always ready to support each other through epic (and sometimes ridiculous) quests."
    ],
    looking: [
      "One or two players who enjoy immersive roleplay, strategic thinking, and are available for weekly sessions.",
      "Ideal players are collaborative and ready to explore their characters' depths.",
      "New to experienced players welcome; come with a passion for mystery!"
    ],
    time: ['We gather every Wednesday at 7 PM EST for a 3-hour session. Consistency is key for us, so we aim to stick to this schedule each week. Adjustments are possible if the whole group agrees, but we prioritize keeping our adventuring time steady!'],
    other: ['We use Roll20 for maps, so familiarity with these platforms is helpful but not required.'],
    members: [{ name: "Camile", age: 30 }, { name: "Barbara", age: 28 }, { name: "Julia", age: 27 }],
    languages: ["English", "Danish"],
    avatar: "/keepers.svg",
  },
];

// Split text with comma separation and line breaks
const splitText = (text) => {
  const parts = text.split(',').map(part => part.trim());
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && ','}
      {index < parts.length - 1 && <br />}
    </span>
  ));
};

// UserProfile Component - for displaying a user profile
const UserProfile = ({ profile, onJoinClick }) => (
  <div className="page-content">
    <div className="profile">
      <img src={profile?.avatar || '/images/default_avatar.png'} alt="User Avatar" className="avatar" />
      {profile?.verify && <img src={profile.verify} alt="verified icon" className="verify" />}
      <div className="profile-data">
        <h2>{profile?.name || 'Unknown Name'}</h2>
        <p className="username">@{profile?.username || 'unknown'}</p>
        <p>Age: <span>{profile?.age || 'N/A'}</span></p>
        <p>Gender: <span>{profile?.gender || 'N/A'}</span></p>
        <p>Pronouns: <span>{profile?.pronouns || 'N/A'}</span></p>
        <div>
          <img src="/location.svg" alt="location" />
          <p>{profile?.location || 'Unknown Location'}</p>
        </div>
      </div>
    </div>

    <div className="about">
      <h3>About D&D</h3>
      <ul className="list">
        {(profile?.aboutDnd || []).map((item, index) => {
          let imageSrc = '';
          if (item.includes('Experienced')) {
            imageSrc = '/witch-hat.svg';
          } else if (item.includes('DM')) {
            imageSrc = '/equipment.svg';
          } else if (item.includes('Homebrew')) {
            imageSrc = '/dicey.svg';
          }
          return (
            <div key={index} className="about-item">
              <img src={imageSrc} alt={item} />
              <p>{splitText(item)}</p>
            </div>
          );
        })}
      </ul>

      <h3>About Me</h3>
      <p>{profile?.aboutMe || 'No description available.'}</p>
      <h3>I&apos;m looking for</h3>
      <p>{profile?.Looking || 'No description available.'}</p>
    </div>

    <div className="about-me">
      <h3>Interests</h3>
      <div className="interests">
        {(profile?.interests || []).map((interest, index) => (
          <span key={index}>{interest}</span>
        ))}
      </div>
    </div>

    <div className="about-me">
      <h3>Spoken Languages</h3>
      <div className="interests">
        {(profile?.languages || []).map((language, index) => (
          <span key={index}>{language}</span>
        ))}
      </div>
    </div>

    <div className="report">
      <button>Report User</button>
    </div>

    <footer className="footer">
      <button className="button pass">
        <img src="/x.svg" alt="pass icon" />Pass
      </button>
      <hr className="divider" />
      <button className="button join" onClick={() => onJoinClick(profile)}>
        <img src="/success.svg" alt="join icon" />Join
      </button>
    </footer>
  </div>
);

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  onJoinClick: PropTypes.func.isRequired,
};

// GroupProfile Component - for displaying a group profile
const GroupProfile = ({ profile, onJoinClick }) => (
  <div className="page-content">
  <div className="profile" style={{ padding: '40px 0px' }}>
    <div className="profile-data">
    <h2 style={{ marginBottom: '10px' }}>{profile?.name || 'Unknown Name'}</h2>
      <div style={{ marginBottom: '5px' }}><img src="/location.svg" alt="location"/><p>{profile?.location}</p></div>
      <div><img src="/Time.svg" alt="time" /><p>Weekly, Wed, 7PM</p></div>
    
    </div>
    <img src={profile?.avatar || '/images/default_avatar.png'} alt="User Avatar" className="avatar" style={{ borderRadius: 'unset' }}/>
    {profile?.verify && <img src={profile.verify} alt="verified icon" className="verify" />}
  </div>

  <div className="about">
    <h3>About D&D</h3>
    <ul className="list">
      {(profile?.aboutDnd || []).map((item, index) => {
        let imageSrc = '';
        if (item.includes('In Person')) {
          imageSrc = '/in-person.svg';
        } else if (item.includes('Puzzle-heavy')) {
          imageSrc = '/puzzle.svg';
        } else if (item.includes('Homebrew')) {
          imageSrc = '/dicey.svg';
        }
        return (
          <div key={index} className="about-item">
            <img src={imageSrc} alt={item} />
            <p>{splitText(item)}</p>
          </div>
        );
      })}
    </ul>

    <h3>Description</h3>
    <p>{profile?.description || 'No description available.'}</p>
    <h3>We&apos;re looking for</h3>
    <p>{profile?.looking || 'No description available.'}</p>
  

  <div className="about-me">
    <h3>Spoken Languages</h3>
    <div className="interests">
      {(profile?.languages || []).map((language, index) => (
        <span key={index}>{language}</span>
      ))}
    </div>
  </div>
  <h3>Meeting Time</h3>
  <p>{profile?.time || 'No description available.'}</p>
  <h3>Other Information</h3>

  <p>{profile?.other || 'No description available.'}</p>

  <h3>Members</h3>
{profile?.members && profile?.members.length > 0 ? (
  <div className="members-list">
    {profile?.members.map((member, index) => (
      <div key={index} className="member-item">
        {/* Display member name and age */}
        <div className="member-info">
          <img src="/avatar.svg" alt="member avatar" />
          <p className="member-name">{member.name},</p>
          <p className="member-age">{member.age} </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No members available.</p>
)}

  </div>


  <div className="report">
    <button>Report Group</button>
  </div>

  <footer className="footer">
    <button className="button pass">
      <img src="/x.svg" alt="pass icon" />Pass
    </button>
    <hr className="divider" />
    <button className="button join" onClick={() => onJoinClick(profile)}>
      <img src="/success.svg" alt="join icon" />Join
    </button>
  </footer>
</div>
);

GroupProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  onJoinClick: PropTypes.func.isRequired,
};

// Matches Component
const Matches = ({ matches }) => (
  <div className="matches-content">
    {matches.length > 0 ? (
      matches.map((match) => (
        <div key={match.id} className="match-item">
          <img src={match.avatar} alt="Matched Avatar" className="avatar" />
          <p>{match.name}</p>
          <button>See<br></br> more</button>
        </div>
      ))
    ) : (
      <div className="no-groups">
        <p>Players and Groups you matched with will appear here.</p>
        <p>Head over to the <span>Discover</span> tab to find players and groups to join.</p>
      </div>
    )}
  </div>
);

Matches.propTypes = {
  matches: PropTypes.array.isRequired,
};

// Main Component (FindPals)
const FindPals = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Discover');
  const [showPopUp, setShowPopUp] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    setActiveTab(tabParam === 'matches' ? 'Matches' : 'Discover');
  }, [location.search]);

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

  const handleJoinClick = (profile) => {
    setMatches((prevMatches) => [...prevMatches, profile]);
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profilesData.length);
    setShowPopUp(true);
    setTimeout(() => setShowPopUp(false), 2000);
  };

  const currentProfile = profilesData[currentProfileIndex];

  return (
    <div>
      {isModalVisible && <FindPalsModal onClose={handleCloseModal} />}
      <div className="upper-division">
        <div className="divide">
          <div onClick={() => setActiveTab('Discover')} className={`tab ${activeTab === 'Discover' ? 'active' : ''}`}>
            Discover
          </div>
          <div onClick={() => setActiveTab('Matches')} className={`tab ${activeTab === 'Matches' ? 'active' : ''}`}>
            Matches
          </div>
        </div>
      </div>

      {showPopUp && (
        <div className="popup-message">
          <img src="/success.svg" alt="success" />
          <p>You&apos;ve shown interest!</p>
        </div>
      )}

      <div className="content">
        {activeTab === 'Discover' ? (
          currentProfile.type === 'user' ? (
            <UserProfile profile={currentProfile} onJoinClick={handleJoinClick} />
          ) : (
            <GroupProfile profile={currentProfile} onJoinClick={handleJoinClick} />
          )
        ) : (
          <Matches matches={matches} />
        )}
      </div>
    </div>
  );
};

export default FindPals;
