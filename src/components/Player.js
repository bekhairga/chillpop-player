import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
const Player = ({songs, setSongs, setCurrentSong, currentSong, setSongInfo, isPlaying, setIsPlaying, audioRef, songInfo}) => {
  
  useEffect(()=>{
    const newSongs = songs.map(el=> {
      if(el.id === currentSong.id){
        return {...el, active: true}
      }else{
        return {...el, active: false}
      }
    });
    setSongs(newSongs);
    if(isPlaying){
      const playPromise =audioRef.current.play();
      if(playPromise !== undefined){
        playPromise.then(audo=>{
          audioRef.current.play();
        });
      }
    }
  }, [currentSong])
  const getTime = (time) => {
    return( 
      Math.floor(time / 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const dragHandler = (e) => {
      audioRef.current.currentTime = e.target.value;
      const duration = e.target.duration;
      const roundedCurrent = Math.round(e.target.value);
      const roundedDuration = Math.round(duration);
      const animationPercentAge = Math.round(roundedCurrent / roundedDuration * 100);
      setSongInfo({...songInfo, currentTime: e.target.value, animationPercentAge });
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

  const skipTrackHandler = async (direction)=>{
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip-forward'){
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }else{
      if((currentIndex-1) % songs.length === -1 ){
        await setCurrentSong(songs[songs.length - 1]);
      }else{
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if(isPlaying) audioRef.current.play();
  }

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentAge || 0}%)`
  }
  return (
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
            <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
            <div style={trackAnimation} className="animate-track"></div>
          </div>
          <p>{getTime(songInfo.duration || 0)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size='2x' icon={faAngleLeft}/> 
            <FontAwesomeIcon onClick={playSongHandler} className="play" size='2x' icon={isPlaying ? faPause :faPlay}/> 
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size='2x' icon={faAngleRight}/> 
        </div>
      </div>
  )
}

export default Player;