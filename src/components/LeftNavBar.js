import React from 'react';
import './LeftNavbar.css';

const LeftNavBar = () => {
  return (
    <>
      <nav id="leftNav">
        <img className="navIcon" src="/images/home-run.svg" alt="home-run" />
        <img className="navIcon" src="/images/more.svg" alt="more"/>
        <div id="listIconCover">
          <img className="navIcon" id="listIcon" src="/images/list.svg" alt="list"/>
        </div>
      </nav>
    </>
  );
}

export default LeftNavBar;