import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({libraryStatus,audioRef,setSongs, songs, setCurrentSong, isPlaying}) =>{
  return(
    <div className={`library ${libraryStatus ? 'active-library': ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song=> <LibrarySong setSongs={setSongs} song={song} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} key={song.id}/>)}
      </div>
    </div>
  )
}
export default Library;