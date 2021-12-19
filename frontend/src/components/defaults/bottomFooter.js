import '../styles/bottomFooter.css';
import { useState, useEffect } from 'react';
import { AttentionButton } from '../../components/overlays/buttons';
import { WhiteContentOverlay } from '../../components/overlays/overlays';


function AddDrinkComponent(props) {

}

function Footer() {
    const [showAddDrink, setShowAddDrink] = useState(false);
    const [showCustom, setShowCustom] = useState(false);

    return (
        <div className="footer">
            {showAddDrink ? <WhiteContentOverlay cbToClose={() => setShowAddDrink(false)}> 
                </WhiteContentOverlay> : null}
            <AttentionButton onClick={() => setShowAddDrink(true)}>Add Drink</AttentionButton>
            <AttentionButton>Custom</AttentionButton>
        </div>
    )
}

export default Footer;