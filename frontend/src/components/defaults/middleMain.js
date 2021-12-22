import '../styles/middleMain.css';
import { AttentionButton } from './../../components/overlays/buttons';
import { getAllDrinks, makeDrink } from './../../requests';
import { useState, useEffect } from 'react'; 
import { WhiteContentOverlay } from '../../components/overlays/overlays';

function FinalDrinkOverview(props) {
    const closecb = props.closecb;
    const drink = props.drink;

    async function pumpDrink() {
        await makeDrink(drink.id);
        closecb();
    }

    return (
        <WhiteContentOverlay cbToClose={closecb}>
            <h2 className="title">{drink.name}</h2>
            <AttentionButton onClick={pumpDrink}>Make Drink</AttentionButton>
        </WhiteContentOverlay>
    )
}

function DrinkCategory(props) {
    const category = props.category;
    const drinks = props.drinks;

    const [showDrinkOverview, setShowDrinkOverview] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState();

    async function showDrinkOverviewFor(drink) {
        setShowDrinkOverview(true);
        setSelectedDrink(drink);
    }

    return (
        <div className="drink-category">
            {showDrinkOverview ? 
                <FinalDrinkOverview closecb={() => setShowDrinkOverview(false)} drink={selectedDrink}>
                </FinalDrinkOverview>
                : null}
            <div className="name">{category}</div>
            <div className="drinks">
                {drinks.map((drink, index) => {
                    return <AttentionButton
                        key={index}
                        onClick={
                            () => showDrinkOverviewFor(drink)
                        }
                    >{drink.name}</AttentionButton>
                    })
                }
            </div>
        </div>
    )
}

function AllDrinkCategories(props) {
    const [nonAlcoholicDrinks, setNonAlcoholicDrinks] = useState();
    const [alcoholicDrinks, setAlcoholicDrinks] = useState();

    useEffect(() => {
        async function getCategories() {
            const response = await getAllDrinks();
            const allDrinks = response.response;

            const alcohol = [];
            const noAlcohol = [];

            allDrinks.forEach((drink) => {
                if (drink.hasAlcohol === 1) {
                    alcohol.push(drink);
                } else {
                    noAlcohol.push(drink);
                }
            });

            setAlcoholicDrinks(alcohol);
            setNonAlcoholicDrinks(noAlcohol);
        }

        getCategories();
    }, [])

    if (alcoholicDrinks && nonAlcoholicDrinks) {
        return (
            <div className="drink-categories">
                <DrinkCategory category="Alcoholic" drinks={alcoholicDrinks}/>
                <DrinkCategory category="Non-alcoholic" drinks={nonAlcoholicDrinks}/>
            </div>
        );
    }
    
    return <div>Loading...</div>
}

function Main() {
    return (
        <div className="main">
            <AllDrinkCategories />
        </div>
    )
}

export default Main;