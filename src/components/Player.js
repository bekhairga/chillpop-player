import { faAngleLeft, faAngleRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const Player = () => {
  return (
      <div className="player">
        <div className="time-control">
          <p>Start time</p>
          <input type="range"/>
          <p>End time</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon className="skip-back" size='2x' icon={faAngleLeft}/> 
            <FontAwesomeIcon className="play" size='2x' icon={faPlay}/> 
            <FontAwesomeIcon className="skip-forward" size='2x' icon={faAngleRight}/> 
        </div>
      </div>
  )
}

export default Player;