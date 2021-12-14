import React, { useState, useEffect } from "react";
import { checkPassword, getPumpsAndStatus, getPossibleDrinks, setPumpSelectionStatus, addIngredient } from "../../requests";
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
    const onChange = props.onChange;
    const startDrink = props.selectedDrink;
    const [ingredients, setIngredients] = useState();
    const [selectedDrink, setSelectedDrink] = useState();

    async function getIngredients() {
        const drinks = await getPossibleDrinks();
        setIngredients(drinks.drinks);
    }

    useEffect(() => {
        if (!startDrink)
            setSelectedDrink('empty')
        else
            setSelectedDrink(startDrink);
    }, [startDrink]);

    useEffect(() => {
        getIngredients();
    }, []);

    function handleChange(event) {
        const newInput = event.target.value;
        setSelectedDrink(newInput);
        try {
            onChange(event);
        } catch (e) {
            console.log('Did you define an onChange prop? ' + e);
        }
    }

    function renderOptions(options) {
        return options.map((option, index) => <option key={index} value={option}>{option}</option>);
    }

    if (ingredients && selectedDrink)
        return (
            <select value={selectedDrink} onChange={handleChange}>
                <option key="empty" value="empty">Empty</option>
                {Object.entries(ingredients).map(([key, value]) => {
                    return (<optgroup key={key} label={key}>
                        {renderOptions(value)}
                    </optgroup>)
                })}
            </select>
        )
    else
        return (
            <select disabled>
                <option value="loading">Loading...</option>
            </select>
        )
}

function IngredientsCategorySelector(props) {
    const onChange = props.onChange;
    const selectedCategory = props.selectedCategory;

    const [currentCategory, setCurrentCategory] = useState();
    const [categories, setCategories] = useState();

    async function getCategories() {
        const response = await getPossibleDrinks();

        const categories = Object.entries(response.drinks).map(([key, value]) => {
            return key;
        });

        setCategories(categories);
    }

    useEffect(() => {
        getCategories();

        if (selectedCategory) setCurrentCategory(selectedCategory);
    }, [selectedCategory]);

    function handleChange(event) {
        const newInput = event.target.value;
        setCurrentCategory(newInput);
        try {
            onChange(newInput);
        } catch (e) {
            console.log('Did you define an onChange prop? ' + e);
        }
    }

    return (
        <select className="ingredients-category-selector" value={currentCategory} onChange={handleChange}>
            <option value=''>Select category</option>
            {categories ? categories.map((category) => <option key={category} value={category}>{category}</option>) : <option>Loading...</option>}
        </select>
    )
}

function PumpSetting(props) {
    const pumpNumber = props.pumpNumber;
    const formattedName = 'pump' + pumpNumber;

    function setSelection(event) {
        const newInput = event.target.value;
        const currentPassword = getPasswordCookie();
        setPumpSelectionStatus(currentPassword, pumpNumber, newInput);
    }

    return <IngredientsSelector onChange={setSelection} selectedDrink={props.selectedDrink} />
}

function PumpSettings() {
    const [pumps, setPumps] = useState();

    async function getPumps() {
        const response = await getPumpsAndStatus();
        const allPumps = response.json.pumps;
        setPumps(allPumps);
    }

    function refresh() {
        setPumps(undefined);
        getPumps();
    }

    useEffect(() => {
        getPumps();
    }, []);

    return (
        <div className="pump-settings">
            <div className="pumps">
                {pumps ? (
                    pumps.map((pumpObj, index) => {
                        return (
                        <PumpSetting key={index} pumpNumber={pumpObj.id} selectedDrink={pumpObj.select} />
                        )
                    })
                ) : <div>Loading...</div>}
            </div>
            <NormalButton onClick={refresh}>Refresh</NormalButton>
        </div>
    )
}

function AddIngredient(props) {
    const [selectedCategory, setSelectedCategory] = useState();
    const [ingredientsName, setIngredientsName] = useState();
    const [locked, setLocked] = useState(false);

    const closecb = props.closecb;

    async function onSubmit(event) {
        event.preventDefault();
        if (!(ingredientsName && selectedCategory)) return;
        setLocked(true);
        const password = getPasswordCookie();
        const addedIngredient = await addIngredient(password, ingredientsName, selectedCategory);
        if (addedIngredient) setIngredientsName();
        setLocked(false);
        closecb();
    }

    function handleChange(event) {
        const newInput = event.currentTarget.value;
        setIngredientsName(newInput);
    }

    if (locked) {
        return <div>Adding...</div>
    } else {
        return (
            <div className="add-ingredient">
                <div className="add-ingredient-title">Add Ingredient</div>
                <form className="add-ingredient-input" onSubmit={onSubmit}>
                    <input type="text" onChange={handleChange} required/>
                    <IngredientsCategorySelector onChange={setSelectedCategory} selectedCategory={selectedCategory}/>
                    <input type="submit" value="Add" required/>
                </form>
            </div>
        )
    }
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
        <div className="settings-hidden">
            <PumpSettings />
            {showRemoveDrink ? <RemoveDrink /> : <DangerButton onClick={() => setShowRemoveDrink(true)}>Remove Drink</DangerButton>}
            {showRemoveIngredient ? <RemoveIngredient /> : <DangerButton onClick={() => setShowRemoveIngredient(true)}>Remove Ingredient</DangerButton>}
            {showAddIngredient ? <AddIngredient closecb={() => setShowAddIngredient(false)}/> : <NormalButton onClick={() => setShowAddIngredient(true)}>Add Ingredient</NormalButton>}
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