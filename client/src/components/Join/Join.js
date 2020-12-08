import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const getName = (e) => setName(e.target.value);
  const getRoom = (e) => setRoom(e.target.value);
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="headingJoin">Chat app</div>
        <div className="inputContainer">
          <input
            className="inputText"
            type="text"
            placeholder="Enter your name..."
            onChange={getName}
          />
          <input
            className="inputText"
            type="text"
            placeholder="Enter ID room"
            onChange={getRoom}
          />
          <Link className="containerBtn" to={`/chat?name=${name}&room=${room}`}>
            <button
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              className="joinBtn"
            >
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
