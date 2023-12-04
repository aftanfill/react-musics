import { createContext, useState } from "react";

export const AUDIO_CONTEXT = createContext({});

const audio = new Audio();

const AudioContext = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleAudio = (track) => {
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      audio.src = track.src;
      audio.currentTime = 0;
      setIsPlaying(true)
      audio.play();
      return;
    }
    if(isPlaying === true){
      audio.pause()
      setIsPlaying(false)
    }else{
      audio.play()
      setIsPlaying(true)
    }
  };

  const value = { handleToggleAudio, currentTrack, isPlaying,audio };

  return (
    <AUDIO_CONTEXT.Provider value={value}>{children}</AUDIO_CONTEXT.Provider>
  );
};

export default AudioContext;
