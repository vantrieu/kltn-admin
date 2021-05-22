import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const PlayMusic = (props: any) => {
    const {tracks, index, setIndex} = props;

    const handleNext = () => {
        if(tracks[index + 1])
            setIndex(index + 1);
        else
            setIndex(0);
    }

    const handlePrevious = () => {
        if(tracks[index - 1])
            setIndex(index - 1);
        else
            setIndex(tracks.length - 1);
        
    }

    return (
        <div style={{background: 'white'}}>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>{tracks[index]?.trackname}</h4>
            <AudioPlayer
                autoPlay={false}
                showSkipControls
                showJumpControls={false}
                onClickNext = {handleNext}
                onEnded = {handleNext}
                onClickPrevious = {handlePrevious}
                src={`${process.env.REACT_APP_API_URL}${tracks[index]?.tracklink}`}
            />
        </div>
    )
}
