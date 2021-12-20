import '../styles/middleMain.css';
import { AttentionButton } from './../../components/overlays/buttons';
import { useState, useEffect } from 'react'; 

function DrinkCategory(props) {
    const category = props.category;
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
    }, [category]);

    return (
        <div className="drink-category">
            <div className="name">{category}</div>
            <div className="drinks">
            </div>
        </div>
    )
}

function AllDrinkCategories(props) {
    const [categories, setCategories] = useState([]);

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