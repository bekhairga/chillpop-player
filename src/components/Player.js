import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
const Player = ({currentSong, isPlaying, setIsPlaying}) => {

  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0})
  const audioRef = useRef(null);

  const getTime = (time) => {
    return( 
      Math.floor(time / 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
    );
  }
  const timeUpdateHandler = (e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration})
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
          <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
          <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon className="skip-back" size='2x' icon={faAngleLeft}/> 
            <FontAwesomeIcon onClick={playSongHandler} className="play" size='2x' icon={isPlaying ? faPause :faPlay}/> 
            <FontAwesomeIcon className="skip-forward" size='2x' icon={faAngleRight}/> 
        </div>
        <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
      </div>
  )
}

export default Player;