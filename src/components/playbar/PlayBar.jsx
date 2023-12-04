import { Pause, PlayArrow } from "@mui/icons-material";
import "./PlayBar.scss";
import { useContext, useEffect, useState } from "react";
import { AUDIO_CONTEXT } from "../../context/AudioContext";
import { formatToMMSS } from "../../helpers/formatToMMSS";
import { IconButton, Slider } from "@mui/material";

//react hooks (useState, useEffect, useContext, useRef,... use...)

const MusicControl = () => {
  const { audio, currentTrack, isPlaying } = useContext(AUDIO_CONTEXT);

  const { duration } = currentTrack;
  const [currentTime, setCurrentTime] = useState(0);

  const musicCurrentTime = formatToMMSS(currentTime);

  const handleCalculateTime = (_, val) => {
    const time = Math.round((val / duration) * 100);
    setCurrentTime(time);
    audio.currentTime = time;
  };

  const sliderTime = ~~((currentTime / duration) *100)

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("time");
      setCurrentTime(audio?.currentTime);
    }, 1000);
    if (isPlaying === false) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <>
      <p>{musicCurrentTime}</p>
      <Slider
        size="medium"
        defaultValue={100}
        value={sliderTime}
        onChange={handleCalculateTime}
        valueLabelDisplay="auto"
      />
    </>
  );
};

const PlayBar = () => {
  const { currentTrack, handleToggleAudio, isPlaying } =
    useContext(AUDIO_CONTEXT);

  if (currentTrack === null) return null;

  const { preview, title, artists, duration } = currentTrack;
  const musicTime = formatToMMSS(duration);

  return (
    <div className="playbar">
      <img className="preview2" src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className="credits2">
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <div className="slider">
        <MusicControl />
        <p>{musicTime}</p>
      </div>
    </div>
  );
};

export default PlayBar;
