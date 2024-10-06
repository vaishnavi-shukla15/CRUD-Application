import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverlayManager = () => {
    const [overlays, setOverlays] = useState([]);
    const [newOverlay, setNewOverlay] = useState({
        position: '',
        size: '',
        content: ''
    });

    const fetchOverlays = async () => {
        const response = await axios.get('http://localhost:5000/overlays');
        setOverlays(response.data);
    };

    const createOverlay = async () => {
        const response = await axios.post('http://localhost:5000/overlays', newOverlay);
        setOverlays([...overlays, response.data]);
        setNewOverlay({ position: '', size: '', content: '' });
    };

    const deleteOverlay = async (id) => {
        await axios.delete(`http://localhost:5000/overlays/${id}`);
        setOverlays(overlays.filter((overlay) => overlay._id !== id));
    };

    useEffect(() => {
        fetchOverlays();
    }, []);

    return (
        <div>
            <h3>Manage Overlays</h3>
            <input 
                type="text" 
                placeholder="Position" 
                value={newOverlay.position}
                onChange={(e) => setNewOverlay({ ...newOverlay, position: e.target.value })}
            />
            <input 
                type="text" 
                placeholder="Size" 
                value={newOverlay.size}
                onChange={(e) => setNewOverlay({ ...newOverlay, size: e.target.value })}
            />
            <input 
                type="text" 
                placeholder="Content" 
                value={newOverlay.content}
                onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
            />
            <button onClick={createOverlay}>Add Overlay</button>

            <ul>
                {overlays.map((overlay) => (
                    <li key={overlay._id}>
                        {overlay.content} (Position: {overlay.position}, Size: {overlay.size})
                        <button onClick={() => deleteOverlay(overlay._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverlayManager;
