import React, { useState, useEffect } from "react";
import { checkPassword, getPumpsAndStatus, getPossibleDrinks, setPumpSelectionStatus } from "../../requests";
import { NormalButton, DangerButton } from "./buttons";
import './../styles/settings.css';

function setPasswordCookie(password) {
    localStorage.setItem('password', password);
}

function getPasswordCookie() {
    return localStorage.getItem('password');
}

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

    function checkInput() {
        /* all on the requests on the shown site after correct password
        must be sent with the correct password */
        if (password === '') setRedBorder(true);
        checkPassword(password).then(res => {
            if (res.correct) {
                cbWhenPasswordCorrect();
                setPasswordCookie(password);
            } else {
                setRedBorder(true);
            }
        });
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => setRedBorder(false), 500);
        return () => clearTimeout(timeoutID);
    }, [redBorder]);

    useEffect(() => {
        const eventHandler = (e) => {
            if (e.code === 'Enter') {
                checkInput();
            }
        }

        document.addEventListener('keydown', eventHandler);
        return () => document.removeEventListener('keydown', eventHandler);
    });

    function handleChange(event) {
        const newInput = event.currentTarget.value;
        setPassword(newInput);
    }

    return (
        <div className={`password-input ${redBorder ? 'invalid' : ''}`}>
            <input value={password} onChange={handleChange} type="password" />
            <button className="submit" onClick={checkInput}>Submit</button>
        </div>
    )

}

function IngredientsSelector(props) {
    
}

function PumpSetting(props) {
    const drinks = props.drinks;
    const pumpNumber = props.pumpNumber;
    const formattedName = 'pump' + pumpNumber;
    const startDrink = props.selectedDrink;
    const [selectedDrink, setSelectedDrink] = useState();

    useEffect(() => {
        if (!startDrink)
            setSelectedDrink('empty')
        else
            setSelectedDrink(startDrink);
    }, [startDrink]);

    function handleChange(event) {
        const newInput = event.target.value;
        const currentPassword = getPasswordCookie();
        setSelectedDrink(newInput);
        setPumpSelectionStatus(currentPassword, pumpNumber, newInput);
    }

    const renderOptions = (options) => {
        return options.map((option) => <option key={option} value={option}>{option}</option>);
    }

    if(drinks && selectedDrink) {
        return (
            <div className="pump-setting">
                <div className="pump-title">Pump {pumpNumber}</div>
                <select name={formattedName} value={selectedDrink} id={formattedName} onChange={handleChange}>
                    <option key="empty" value="empty">Empty</option>
                    {Object.entries(drinks).map(([key, value]) => {
                        return (<optgroup key={key} label={key}>
                            {renderOptions(value)}
                        </optgroup>)
                    })}
                </select>
            </div>
        );
    } else {
        return (
            <select name={formattedName} id={formattedName} disabled>
                <option value="loading">Loading...</option>
            </select>
        );
    }
}

function PumpSettings(props) {
    const [drinks, setDrinks] = useState();
    const [pumps, setPumps] = useState();

    async function getDrinks() {
        const drinks = await getPossibleDrinks();
        setDrinks(drinks.drinks);
    }

    async function getPumps() {
        const response = await getPumpsAndStatus();
        const allPumps = response.json.pumps;
        setPumps(allPumps);
    }

    function refresh() {
        setDrinks(undefined);
        setPumps(undefined);
        getDrinks();
        getPumps();
    }

    useEffect(() => {
        getDrinks();
        getPumps();
    }, []);

    return (
        <div className="pump-settings">
            <div className="pumps">
                {pumps && drinks ? (
                    pumps.map((pumpObj, index) => {
                        return (
                        <PumpSetting key={index} pumpNumber={pumpObj.id} selectedDrink={pumpObj.select} drinks={drinks} />
                        )
                    })
                ) : <div>Loading...</div>}
            </div>
            <NormalButton onClick={refresh}>Refresh</NormalButton>
        </div>
    )
}

function AddIngredient() {
    return (
        <div className="add-ingredient">
            <div className="add-ingredient-title">Add Ingredient</div>
            <form className="add-ingredient-input">
                <input type="text" />
                <button className="submit">Submit</button>
            </form>
        </div>
    )
}

function RemoveDrink() {
    return <DangerButton>Remove Drink</DangerButton>;
}

function RemoveIngredient() {
    return <DangerButton>Remove Ingredient</DangerButton>;
}

function SettingsHidden() {
    const [showRemoveDrink, setShowRemoveDrink] = useState(false);
    const [showRemoveIngredient, setShowRemoveIngredient] = useState(false);
    const [showAddIngredient, setShowAddIngredient] = useState(false);

    return (
        <div class="settings-hidden">
            <PumpSettings />
            {showRemoveDrink ? <RemoveDrink /> : <DangerButton onClick={() => setShowRemoveDrink(true)}>Remove Drink</DangerButton>}
            {showRemoveIngredient ? <RemoveIngredient /> : <DangerButton onClick={() => setShowRemoveIngredient(true)}>Remove Ingredient</DangerButton>}
            {showAddIngredient ? <AddIngredient /> : <NormalButton onClick={() => setShowAddIngredient(true)}>Add Ingredient</NormalButton>}
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
                {accessGranted ? <SettingsHidden /> : <Password cbWhenCorrect={grantAccess}/>}
                <CloseButton cbWhenPressed={cbToClose}/>
            </div>
        </div>
    )
}

export default SettingsMenu;