import React, { useState, useEffect } from "react";
import { checkPassword } from "../../requests";
import './../styles/settings.css';

function BlurBackground() {
    // add pointer events on mount and unmount?

    return (
        <div className="blur-background">
        </div>
    )
}

function CloseButton(props) {
    const cbWhenPressed = props.cbWhenPressed;

    return (
        <button className="close-button" onClick={cbWhenPressed}>
        </button>
    )
}


function Password(props) {
    const [password, setPassword] = useState('');
    const [redBorder, setRedBorder] = useState(false);
    const cbWhenPasswordCorrect = props.cbWhenCorrect;

    useEffect(() => {
        const timeoutID = setTimeout(() => setRedBorder(false), 500);
        return () => clearTimeout(timeoutID);
    }, [redBorder]);

    function checkInput() {
        /* all on the requests on the shown site after correct password
        must be sent with the correct password */
        if (password === '') setRedBorder(true);
        checkPassword(password).then(res => {
            if (res.correct) {
                cbWhenPasswordCorrect();
            } else {
                setRedBorder(true);
            }
        });
    }

    function handleChange(event) {
        setPassword(event.currentTarget.value);
    }

    return (
        <div className={`password-input ${redBorder ? 'invalid' : ''}`}>
            <input onChange={handleChange} type="password" />
            <button className="submit" onClick={checkInput}>Submit</button>
        </div>
    )

}

function DropDown(props) {
    
}

function PumpSetting(props) {
    const pumpNumber = props.pumpNumber;

    return (
        <div className="pump-setting">
            <div className="pump-number" data-number={pumpNumber}>{pumpNumber}</div>
            <div className="selected-output">
            </div>
        </div>
    )
}

function AllPumpSettings() {
    return (
        <div className="pump-settings">
        </div>
    );
}


function SettingsMenu(props) {
    const [accessGranted, setAccessGranted] = useState(false);
    const cbToClose = props.cbToClose;
    const showSettings = props.show;

    function grantAccess() {
        setAccessGranted(true);
    }

    return (
        <div className={`settings-menu ${showSettings ? 'active' : ''}`}>
            <BlurBackground />
            <div className="settings-container">
                {accessGranted ? <p>Access granted</p> : <Password cbWhenCorrect={grantAccess}/>}
                <CloseButton cbWhenPressed={cbToClose}/>
            </div>
        </div>
    )
}

export default SettingsMenu;