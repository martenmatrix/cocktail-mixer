import '../styles/bottomFooter.css';
import { useState, useEffect } from 'react';
import { AttentionButton } from '../../components/overlays/buttons';

function Footer() {
    return (
        <div className="footer">
            <AttentionButton>Add Drink</AttentionButton>
            <AttentionButton>Custom</AttentionButton>
        </div>
    )
}

export default Footer;