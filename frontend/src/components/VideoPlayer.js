import React from 'react';

const VideoPlayer = ({ rtspUrl }) => {
    return (
        <div>
            <video controls>
                <source src={rtspUrl} type="application/x-rtsp" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
