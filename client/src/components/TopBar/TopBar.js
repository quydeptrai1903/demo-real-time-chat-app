import React from 'react';
import { Link } from 'react-router-dom';
import FindIcon from './FindIcon';
import './TopBar.css';

const TopBar = ({ findNewStranger }) => {
  return (
    <div className='topBarContainer'>
      <Link to='/'>
        <h1 className='heading'>Chat app</h1>
      </Link>
      <div
        className='find'
        onClick={() => {
          findNewStranger();
        }}>
        <FindIcon />
      </div>
    </div>
  );
};

export default TopBar;
