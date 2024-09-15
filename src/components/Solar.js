import React from 'react';
import Prompt from './Prompt';
import Theme from './Theme';

export default function Solar({ selectedTheme, setSelectedTheme }) {
  return (
    <>
      <div className="main">
        <div className='main-2'>
          <div className='posi'>
            <img className="p2" src="/p2.svg" alt="Planet 1" />
          </div>
          <img className="p3" src="/p3.svg" alt="Planet 1" />
          <img className="p4" src="/p4.svg" alt="Planet 1" />
          <img className="p5" src="/p5.svg" alt="Planet 1" />
          <div className="first">
            <div className='blur'></div>
            <div className="second">
              <div className='blur1'></div>
              <div className="third">
              </div>
            </div>
          </div>
        </div>
        <img className="p1" src="/p1.svg" alt="Planet 1" />
        <Prompt/>
        <Theme selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      </div>
    </>
  );
}