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
        if (password === '') return;
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


function SettingsMenu(props) {
    const [isOpen, setIsOpen] = useState(false);

    function showSettings() {
        setIsOpen(true);
    }

    return (
        <div className="settings-menu">
            <BlurBackground />
            <div className="settings-container">
                {isOpen ? <p>Access granted</p> : <Password cbWhenCorrect={showSettings}/>}
            </div>
        </div>
    )
}

export default SettingsMenu;