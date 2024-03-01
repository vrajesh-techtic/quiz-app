import React, { useEffect, useRef } from 'react'
import videoURL from '../assets/BG-GIF.mp4';

const BackgroundVideo = () => {

    const vidSpeed = useRef();
    useEffect(() => {
        // Set playback rate to slow down the video
        if (vidSpeed.current) {
            vidSpeed.current.playbackRate = 0.75; // Adjust the value as needed, 0.5 will slow down the video by half
        }
    }, []);



    return (

        <video
            className='vid'
            ref={vidSpeed}
            style={{
                width: "100%",
                maxHeight: "100vh",
                display: 'flex',
                position: "absolute",
                zIndex: '-2',


            }} loop muted autoPlay  >
            <source src={videoURL} type='video/mp4' />
        </video>

    )
}

export default BackgroundVideo