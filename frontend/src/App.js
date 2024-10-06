import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import OverlayManager from './components/OverlayManager';

function App() {
    const [rtspUrl, setRtspUrl] = useState('');

    const handleUrlChange = (e) => {
        setRtspUrl(e.target.value);
    };

    return (
        <div className="App">
            <h1>Livestream with Overlays</h1>
            <input 
                type="text" 
                placeholder="Enter RTSP URL" 
                value={rtspUrl}
                onChange={handleUrlChange}
            />
            <VideoPlayer rtspUrl={rtspUrl} />
            <OverlayManager />
        </div>
    );
}

export default App;
