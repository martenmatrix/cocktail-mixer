import '../styles/bottomFooter.css';
import { useState, useEffect } from 'react';
import { AttentionButton, RemoveButton, NormalButton } from '../../components/overlays/buttons';
import { WhiteContentOverlay } from '../../components/overlays/overlays';
import { getPossibleUnits, createDrink } from '../../requests';
import { IngredientsSelector } from './../../components/overlays/settings';

function UnitSelector(props) {
    const onChange = props.onChange;
    const [units, setUnits] = useState();
    const [selectedUnit, setSelectedUnit] = useState();

    useEffect(() => {
        async function getUnits() {
            const units = await getPossibleUnits();
            setUnits(units);
        }

        getUnits();
    }, []);

    function handleChange(e) {
        setSelectedUnit(e.target.value);
        onChange(e);
    }

    return (
        <select className="unit-selector" onChange={handleChange} value={selectedUnit}>
            {selectedUnit ? null :  <option value="">Select Unit</option>}
            {units ? units.map((unit) => {
                return (
                    <option key={unit} value={unit}>
                        {unit}
                    </option>
                )
            }) : null}
        </select>
    )
}

function AmountInput(props) {
    const onChange = props.onChange;
    const [value, setValue] = useState('');

    function handleChange(e) {
        const newValue = e.target.value;
        if (newValue > 1000) return;
        if (newValue < 0) return;
        setValue(newValue);
        onChange(e);
    }

    return (
        <input className="amount-input" type="number" onChange={handleChange} max="1000" min="1" value={value} />
    )
}

function IngredientSection(props) {
    const onDelete = props.onDelete;
    const onIngredientChange = props.onIngredientChange;
    const onAmountChange = props.onAmountChange;
    const onUnitOfMeasurementChange = props.onUnitOfMeasurementChange;

    function handleChangeIngredient(e) {
        const newIngredient = e.target.value;
        onIngredientChange(newIngredient);
    }

    function handleChangeAmount(e) {
        const newAmount = e.target.value;
        onAmountChange(newAmount);
    }

    function handleChangeUnit(e) {
        const newUnit = e.target.value;
        onUnitOfMeasurementChange(newUnit);
    }

    return (
        <div className="ingredient-section">
            <IngredientsSelector onChange={handleChangeIngredient}/>
            <AmountInput onChange={handleChangeAmount} />
            <UnitSelector onChange={handleChangeUnit}/>
            <RemoveButton onClick={onDelete}/>
        </div>
    )
}

function AddDrinkComponent(props) {
    const [name, setName] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [blockInput, setBlockInput] = useState(false);

    function getID() {
        return Math.floor(+Date.now() + Math.random());
    }

    function addIngredient() {
        setIngredients([...ingredients, {
            id: getID(),
            ingredient: '',
            amount: '',
            unit: ''
        }]);
    }

    function removeIngredient(id) {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }

    function setIngredient(id, newIngredient) {
        setIngredients(ingredients.map((ingredient) => {
            if (ingredient.id === id) {
                return {
                    ...ingredient,
                    ingredient: newIngredient
                }
            }

            return ingredient;
        }));
    }

    function setAmount(id, newAmount) {
        setIngredients(ingredients.map((ingredient) => {
            if (ingredient.id === id) {
                return {
                    ...ingredient,
                    amount: newAmount
                }
            }

            return ingredient;
        }));
    }

    function setUnit(id, newUnit) {
        setIngredients(ingredients.map((ingredient) => {
            if (ingredient.id === id) {
                return {
                    ...ingredient,
                    unit: newUnit
                }
            }

            return ingredient;
        }));
    }

    function handleNameChange(e) {
        const newName = e.target.value;
        setName(newName);
    }

    function validateInput() {
        if (ingredients.length === 0) return false;

        const everythingHasValues = ingredients.every((ingredient) => {
            return (ingredient.id && ingredient.ingredient && ingredient.amount && ingredient.unit) != false;
        });
        const hasName = (name != false);

        return everythingHasValues && hasName;
    }

    async function submit() {
        setBlockInput(true);
        const correctFormatting = validateInput();
        if (correctFormatting) {
            const newDrink = {
                name,
                ingredients
            }

            const response = await createDrink(newDrink);

            if (response.success === true) {
                setName('');
                setIngredients([]);
            }
        }
        setBlockInput(false);
    }

    if (blockInput) return (
        <div className="add-drink-component">
            Adding...
        </div>
    )

    return (
        <>
            <div className="add-drink-component">
                <input className="name" type="text" value={name} onChange={handleNameChange}></input>

                {ingredients.length ? ingredients.map((ingredient) => {
                    return (
                        <IngredientSection key={ingredient.id} 
                        onDelete={
                            () => {
                                const id = ingredient.id;
                                removeIngredient(id);   
                            }
                        }
                        onIngredientChange={
                            (newIngredient) => setIngredient(ingredient.id, newIngredient)
                        }
                        onAmountChange={
                            (newAmount) => setAmount(ingredient.id, newAmount)
                        }
                        onUnitOfMeasurementChange={
                            (newUnit) => setUnit(ingredient.id, newUnit)
                        }
                    />
                    )
                }) : null}
                <AttentionButton onClick={addIngredient}>Add Ingredient</AttentionButton>
            </div>
            <div className="submit-container">
                <AttentionButton onClick={submit}>Submit</AttentionButton>
            </div>
        </>
    )
}

function CustomComponent(props) {
    return (
        <>
        </>
    )
}

function Footer() {
    const [showAddDrink, setShowAddDrink] = useState(false);
    const [showCustom, setShowCustom] = useState(false);

    return (
        <div className="footer">
            {showAddDrink ? <WhiteContentOverlay cbToClose={() => setShowAddDrink(false)}> 
                <AddDrinkComponent />
            </WhiteContentOverlay> : null}

            {showCustom ? <WhiteContentOverlay cbToClose={() => setShowCustom(false)}>
                <CustomComponent />
            </WhiteContentOverlay> : null}

            <AttentionButton onClick={() => setShowAddDrink(true)}>Add Drink</AttentionButton>
            <AttentionButton onClick={() => setShowCustom(true)}>Custom</AttentionButton>
        </div>
    )
}

export default Footer;