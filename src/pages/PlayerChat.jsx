import { useState } from "react";
import "../styles/Chat.css";
import { NavLink } from "react-router-dom";

function PlayerChat() {
  const [messages, setMessages] = useState([
    {
      sender: "Jonas",
      text: "Hi, I'm so happy to match with you! I also like fantasy literature.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { sender: "Me", text: inputValue }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <NavLink to="/MyPals">
          <button className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="17"
              viewBox="0 0 10 17"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.41379 8.485L9.48479 15.556L8.07079 16.97L0.292786 9.192C0.105315 9.00447 0 8.75016 0 8.485C0 8.21984 0.105315 7.96553 0.292786 7.778L8.07079 0L9.48479 1.414L2.41379 8.485Z"
                fill="#F2F2F2"
              />
            </svg>
          </button>
        </NavLink>
        <img src="avatar.svg" alt="avatar" />
        <h1>Jonas</h1>
      </header>
      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === "Me" ? "me" : "them"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default PlayerChat;
