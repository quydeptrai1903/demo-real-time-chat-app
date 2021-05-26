import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');

  const getName = (e) => setName(e.target.value);
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <div className='headingJoin'>Chat app</div>
        <div className='inputContainer'>
          <input
            className='inputText'
            type='text'
            placeholder='Enter your name...'
            onChange={getName}
          />
          <Link className='containerBtn' to={`/chat?name=${name}`}>
            <button
              onClick={(e) => (!name ? e.preventDefault() : null)}
              className='joinBtn'>
              Find
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
