//Video pause and Play using useEffect


import React from 'react';

const VideoPlayer = () => {
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const handlePlayPause = () => {
        if (videoRef.current) 
            {
            if (isPlaying) 
            {
                videoRef.current.pause();
            } 
            else 
            {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', () => {
                setIsPlaying(false);
            });
        }
    }, []);
    return (
        <div>
            <video ref={videoRef} src="https://www.youtube.com/watch?v=kM_7KFC4Fdw" controls />
            <button onClick={handlePlayPause}>{isPlaying? 'Pause' : 'Play'}</button>

        </div>
    )
}


export default VideoPlayer;