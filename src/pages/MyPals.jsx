import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/MyPals.css";
import { NavLink } from "react-router-dom";

const userData = {
  name: "Jonas",
  age: 22,
  name2: "Londinius",
  age2: 20,
  groupName: "The Wildblades",
  groupName2: "HobbitoidZ",
};

const Modal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Add Player</h2>
      <input type="text" placeholder="Type name" />
      <span>#</span>
      <input type="text" placeholder="Type code" />
      <p>
        The code is a unique number, known only to the owner and those they
        share it with.
      </p>
      <div className="modal-buttons">
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button className="add-button">Add</button>
      </div>
      <button className="close-modal" onClick={onClose}>
        &times;
      </button>
    </div>
  </div>
);

// Add PropTypes validation for Modal component
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Players = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddPlayerClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NavLink to="/PlayerChat">
        <div className="players-content">
          <img src="avatar.svg" alt="avatar" />
          <div className="players-content-text">
            <h1>
              {userData.name}, {userData.age}
            </h1>
            <h2>You: Thank you for today!</h2>
          </div>
          <div className="time">
            <h2>19:42</h2>
          </div>
        </div>
      </NavLink>
      <div className="players-content">
        <img src="avatar.svg" alt="avatar" />
        <div className="players-content-text">
          <h1>
            {userData.name2}, {userData.age2}
          </h1>
          <h2>Londinius: Would you like to review...</h2>
        </div>
        <div className="time">
          <h2>20:13</h2>
        </div>
      </div>
      <footer className="footer-mypals" onClick={handleAddPlayerClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            d="M16 2V29"
            stroke="#F2F2F2"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <path
            d="M29.0005 16.0889H2.00012"
            stroke="#F2F2F2"
            strokeWidth="3"
            strokeLinecap="square"
          />
        </svg>
        <h3>Add Player</h3>
      </footer>
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

const Groups = () => (
  <div>
    <div className="players-content">
      <img src="/group-avatar.svg" alt="avatar" />
      <div className="players-content-text">
        <h1>{userData.groupName}</h1>
        <h2>Astrid: Thank you for today! </h2>
      </div>
      <div className="time">
        <h2>19:42</h2>
      </div>
    </div>
    <div className="players-content">
      <img src="/keepers.svg" alt="avatar" />
      <div className="players-content-text">
        <h1>{userData.groupName2}</h1>
        <h2>Chelseigh: How about tomorrow?</h2>
      </div>
      <div className="time">
        <h2>20:13</h2>
      </div>
    </div>
    <footer className="footer-mypals">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
      >
        <path
          d="M16 2V29"
          stroke="#F2F2F2"
          strokeWidth="3"
          strokeLinecap="square"
        />
        <path
          d="M29.0005 16.0889H2.00012"
          stroke="#F2F2F2"
          strokeWidth="3"
          strokeLinecap="square"
        />
      </svg>
      <h3>Create Group</h3>
    </footer>
  </div>
);

const MyPals = () => {
  const [activeTab, setActiveTab] = useState("Players");

  return (
    <div>
      <div className="upper-division-mypals">
        <div className="divide">
          <div
            onClick={() => setActiveTab("Players")}
            className={`tab ${activeTab === "Players" ? "active" : ""}`}
          >
            Players
          </div>
          <div
            onClick={() => setActiveTab("Groups")}
            className={`tab ${activeTab === "Groups" ? "active" : ""}`}
          >
            Groups
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="content">
          {activeTab === "Players" ? <Players /> : <Groups />}
        </div>
      </div>
    </div>
  );
};

export default MyPals;
