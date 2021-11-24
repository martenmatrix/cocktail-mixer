import React, { useState, useEffect } from 'react';
import { getStatus } from '../../requests';
import '../styles/topHeader.css';

function useConnectedStatus() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const status = await getStatus();
            const onlineStatus = status.online;

            if(onlineStatus !== isConnected) {
                setIsConnected(onlineStatus);
            }
        }

        checkStatus();
        const intervalID = setInterval(checkStatus, 2000);
        return () => clearInterval(intervalID);
    });

    return isConnected;
}

function ConnectionStatus() {
    const isConnected = useConnectedStatus();

    return (
        <div className="status">
            <div className={`circle ${isConnected ? 'green' : 'red'}`}>
            </div>

            <div className="text">
                {isConnected ? 'Connected' : 'Disconnected'}
            </div>
        </div>
    )
}

function Header() {
    return (
        <ConnectionStatus />
    )
}

export { Header };