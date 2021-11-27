import React, { useState, useEffect } from 'react';
import settingsIcon from './../assets/settings.svg';
import '../styles/topHeader.css';

import { getStatus } from './../../requests';

function useOnlineStatus() {
    const [onlineStatus, setOnlineStatus] = useState({
        online: false,
        task: 'Idle'
    });

    useEffect(() => {
        async function checkStatus() {
            const newStatus = await getStatus();

            if(onlineStatus !== newStatus) {
                setOnlineStatus(newStatus);
            }
        }

        checkStatus();
        const intervalID = setInterval(checkStatus, 2000);
        return () => clearInterval(intervalID);
    }, []);

    return onlineStatus;
}

function ConnectionStatus(props) {
    const isConnected = props.connected;

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

function TaskStatus(props) {
    const task = props.currentTask;

    return (
        <div className="task">
            <div className="current">Current Status:</div>
            <div className="task">{task}</div>
        </div>
    )
}

function SettingsIcon(props) {
    const openSettings = props.openSettings;

    return (
        <div className="settings">
            <img src={settingsIcon} alt="Settings"></img>
        </div>
    )
}

function Header() {
    const connectionStatus = useOnlineStatus();
    const isOnline = connectionStatus.online;
    const currentlyDoing = connectionStatus.task;

    return (
        <div className="top-header">
            <ConnectionStatus connected={isOnline}/>
            <TaskStatus currentTask={currentlyDoing}/>
            <SettingsIcon />
        </div>
    )
}

export { Header };