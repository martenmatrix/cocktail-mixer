import React, { useState, useEffect } from 'react';
import settingsIcon from './../assets/settings.svg';
import '../styles/topHeader.css';

import { getStatus } from './../../requests';

function useOnlineStatus() {
    const [onlineStatus, setOnlineStatus] = useState({
        online: false,
        task: 'Idle'
    });

    async function checkStatus() {
        const newStatus = await getStatus();
        setOnlineStatus(newStatus);
    }

    useEffect(() => {
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
    const cbWhenPressed = props.cbWhenPressed;

    return (
        <div onClick={cbWhenPressed} className="settings">
            <img src={settingsIcon} alt="Settings"></img>
        </div>
    )
}

function Header(props) {
    const connectionStatus = useOnlineStatus();
    const isOnline = connectionStatus.online;
    const currentlyDoing = connectionStatus.task;

    const cbShowSettings = props.cbShowSettings;
    return (
        <div className="top-header">
            <ConnectionStatus connected={isOnline}/>
            <TaskStatus currentTask={currentlyDoing}/>
            <SettingsIcon cbWhenPressed={cbShowSettings}/>
        </div>
    )
}

export default Header;