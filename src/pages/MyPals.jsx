import { useState } from "react";
import "../styles/MyPals.css";
import { NavLink } from "react-router-dom";

const userData = {
  name: "Jonas",
  age: 22,
  name2: "Londinius",
  age2: 20,
  groupName: "The Wildblades",
  groupName2: "MOTHERS!!!",
};

// Mock Players and Groups components
const Players = () => (
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
        <h2>Londinius: Would you like to review... </h2>
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
      <h3>Add Player</h3>
    </footer>
  </div>
);

const Groups = () => (
  <div>
    <div className="players-content">
      <img src="group-avatar.svg" alt="avatar" />
      <div className="players-content-text">
        <h1>{userData.groupName}</h1>
        <h2>Astrid: Thank you for today! </h2>
      </div>
      <div className="time">
        <h2>19:42</h2>
      </div>
    </div>
    <div className="players-content">
      <img src="group-avatar.svg" alt="avatar" />
      <div className="players-content-text">
        <h1>{userData.groupName2}</h1>
        <h2>Chelseigh: WE ATE GUYS!!!</h2>
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
  const [activeTab, setActiveTab] = useState("Players"); // State to track the active component

  return (
    <div>
      {/* Upper division with tab buttons */}
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

      {/* User Profile Section */}
      <div className="page-content">
        {/* Content section that swaps between Discover and Matches */}

        <div className="content">
          {activeTab === "Players" ? <Players /> : <Groups />}
        </div>
      </div>
    </div>
  );
};

export default MyPals;
