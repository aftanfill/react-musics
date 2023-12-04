import './Track.scss'
import { IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import { useContext } from 'react'
import { AUDIO_CONTEXT } from '../../context/AudioContext'
import { formatToMMSS  } from '../../helpers/formatToMMSS'

const Track = ({ track }) => {
    const { preview, title, artists, duration} = track
    const { handleToggleAudio, isPlaying, currentTrack } = useContext(AUDIO_CONTEXT )

    const isCurrentPlay = currentTrack?.id === track.id
    const musicTime = formatToMMSS(duration)

  return (
    <div className="track playing">
        <IconButton onClick={() => handleToggleAudio(track)}>
            {isPlaying && isCurrentPlay ? <Pause /> : <PlayArrow />}
        </IconButton>
        <img className="preview" src={preview} alt="" />
        <div className="credits">
            <b>{title}</b>
            <p>{artists}</p>
        </div>
        <p>{musicTime}</p>
    </div>
  )
}

export default Track