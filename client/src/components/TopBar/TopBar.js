import React from "react";

import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topBarContainer">
      <h1 className="heading">Chat app</h1>
      <button className="closeBtn">Close</button>
    </div>
  );
};

export default TopBar;
