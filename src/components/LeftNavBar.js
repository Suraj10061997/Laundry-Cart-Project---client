import React from 'react';
import './LeftNavbar.css';

const LeftNavBar = () => {
  return (
    <>
      <nav id="leftNav">
        <img className="navIcon" src="/images/home-run.svg" />
        <img className="navIcon" src="/images/more.svg" />
        <div id="listIconCover">
          <img className="navIcon" id="listIcon" src="/images/list.svg" />
        </div>
      </nav>
    </>
  );
}

export default LeftNavBar;