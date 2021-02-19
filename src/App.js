import React, { useRef, useState } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import "./styles/app.scss";
import data from './util';
function App() {
  const [songs, setSongs] = useState(data());
  const[currentSong, setCurrentSong] = useState(songs[0]);
  const[isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0, animationPercentAge: 0})
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentAge = Math.round(roundedCurrent / roundedDuration * 100);
    console.log(animationPercentAge);
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentAge})
  }
  const songEndHandler = async () =>{
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // if((currentIndex-1) % songs.length === -1 ){
      //   await setCurrentSong(songs[songs.length - 1]);
      // }else{
      //   await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // }
      if(isPlaying) audioRef.current.play();
    }
  return (
    <div className={`App ${libraryStatus ? 'library-active' : "" }`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs = {songs} songInfo={songInfo} setSongInfo={setSongInfo}  audioRef={audioRef} currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying ={setIsPlaying}/>
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs = {songs} setCurrentSong={setCurrentSong} />
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
      
    </div>
  );
}

export default App;
