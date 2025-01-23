import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = () => {
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    React.useEffect(() => {
        if (videoRef.current) {
            const handleVideoEnd = () => {
                setIsPlaying(false);
            };
            videoRef.current.addEventListener('ended', handleVideoEnd);
            return () => {
                videoRef.current.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, []);

    return (
        <div className="video-container">
            <video ref={videoRef} className="video-player" src="https://www.w3schools.com/html/mov_bbb.mp4" />
            <button onClick={handlePlayPause} className="play-pause-btn">
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default VideoPlayer;
