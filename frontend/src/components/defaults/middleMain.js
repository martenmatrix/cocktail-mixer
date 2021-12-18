import '../styles/middleMain.css';
import { getCategories, getDrinks } from './../../requests';
import { AttentionButton } from './../../components/overlays/buttons';
import { useState, useEffect } from 'react'; 

function DrinkCategory(props) {
    const category = props.category;
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        getDrinks(category).then(response => {
            setDrinks(response.drinks);
        });
    }, [category]);

    return (
        <div className="drink-category">
            <div className="name">{category}</div>
            <div className="drinks">
                {drinks.map(drink => <AttentionButton key={drink.id}>{drink}</AttentionButton>)}
            </div>
        </div>
    )
}

function AllDrinkCategories(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.categories);
        });
    }, []);

    return (
        <div className="drink-categories">
            {categories.map(category => {
                return (
                    <DrinkCategory key={category.id} category={category}/>
                )
            })}
        </div>
    );
}

function Main() {
    return (
        <div className="main">
            <DrinkCategory />
        </div>
    )
}

export default Main;