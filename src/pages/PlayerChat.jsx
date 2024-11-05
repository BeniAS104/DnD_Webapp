import { useState } from "react";
import "../styles/Chat.css";

function PlayerChat() {
  const [messages, setMessages] = useState([
    {
      sender: "Jonas",
      text: "Hi, I'm so happy to match with you! I also like fantasy literature",
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
        <button className="back-button">&lt;</button>
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
