import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./MessagesContainer.css";

import Message from "../Message/Message";

const MessagesContainer = ({ messages, name }) => {
  return (
    <ScrollToBottom>
      <div className="messagesContainer">
        {messages.map((message, i) => (
          <Message key={i} message={message} name={name} />
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default MessagesContainer;
