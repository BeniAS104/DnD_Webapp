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
            className={`chat-bubble-container ${
              message.sender === "Me" ? "me" : "them"
            }`}
          >
            {message.sender !== "Me" && (
              <img src="avatar.svg" alt="Sender Icon" className="chat-avatar" />
            )}
            <div
              className={`chat-bubble ${
                message.sender === "Me" ? "me" : "them"
              }`}
            >
              {message.text}
            </div>
            {message.sender === "Me" && (
              <img src="avatar.svg" alt="My Icon" className="chat-avatar" />
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
        >
          <path
            d="M24.7293 16.9223L14.8376 26.8672C12.1254 29.594 7.81766 29.594 5.26496 26.8672C2.55271 24.1404 2.55271 19.8095 5.26496 17.2431L18.0285 4.41103C19.6239 2.96742 22.0171 2.96742 23.6125 4.41103C25.208 6.01504 25.208 8.58145 23.6125 10.0251L12.604 21.0927C12.1254 21.5739 11.3276 21.5739 10.849 21.0927C10.3704 20.6115 10.3704 19.8095 10.849 19.3283L18.9858 11.1479C19.6239 10.5063 19.6239 9.54386 18.9858 8.90226C18.3476 8.26065 17.3903 8.26065 16.7521 8.90226L8.61539 17.2431C6.8604 19.0075 6.8604 21.7343 8.61539 23.4987C10.3704 25.1028 13.0826 25.1028 14.8376 23.4987L25.8462 12.4311C28.7179 9.54386 28.7179 5.05263 25.8462 2.16541C22.9744 -0.721805 18.5071 -0.721805 15.6353 2.16541L2.8718 14.9975C0.957265 16.9223 0 19.4887 0 22.0551C1.04977e-10 27.6692 4.46724 32 10.0513 32C12.7635 32 15.1567 30.8772 17.0712 29.1128L26.963 19.1679C27.6011 18.5263 27.6011 17.5639 26.963 16.9223C26.3248 16.2807 25.3675 16.2807 24.7293 16.9223Z"
            fill="#D4AF37"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H26V26H0V0ZM11.5556 19.5144L7.94444 15.1667L2.88889 21.6667H23.1111L16.6111 13L11.5556 19.5144ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            fill="#D4AF37"
          />
        </svg>
        <input
        className="chat-inputed"
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <svg
          onClick={handleSendMessage}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
        >
          <path
            d="M0 21V13.125L10.5263 10.5L0 7.875V0L25 10.5L0 21Z"
            fill="#D4AF37"
          />
        </svg>
      </div>
    </div>
  );
}

export default PlayerChat;
