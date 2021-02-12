import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const Player = ({currentSong, setSongInfo, isPlaying, setIsPlaying, audioRef, songInfo}) => {

  const getTime = (time) => {
    return( 
      Math.floor(time / 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const dragHandler = (e) => {
      audioRef.current.currentTime = e.target.value;
      setSongInfo({...songInfo, currentTime: e.target.value});
  }
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(false);
    }else{
      audioRef.current.play();
      setIsPlaying(true);
    }
  }
  return (
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
          <p>{getTime(songInfo.duration || 0)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon className="skip-back" size='2x' icon={faAngleLeft}/> 
            <FontAwesomeIcon onClick={playSongHandler} className="play" size='2x' icon={isPlaying ? faPause :faPlay}/> 
            <FontAwesomeIcon className="skip-forward" size='2x' icon={faAngleRight}/> 
        </div>
      </div>
  )
}

export default Player;