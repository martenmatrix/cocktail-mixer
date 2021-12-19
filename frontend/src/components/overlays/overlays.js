import { useState, useEffect } from 'react';
import './../styles/overlays.css';

function CloseButton(props) {
    const cbWhenPressed = props.cbWhenPressed;

    return (
        <button className="close-button" onClick={cbWhenPressed}>
        </button>
    )
}

function BlurBackground() {
    // add pointer events on mount and unmount?

    return (
        <div className="blur-background">
        </div>
    )
}

function WhiteContentOverlay(props) {
    const content = props.children;
    const closecb = props.cbToClose;
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setTimeout(
            () => {
                setOpacity(1);
            }, 50
        )
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') handleClose();
        });
    
        return () => {
            document.removeEventListener('keydown', (e) => {
                if (e.code === 'Escape') handleClose();
            });
        }
    }, [])

    function handleClose() {
        setOpacity(0);
        setTimeout(closecb, 200);
    }

    return (
        <div className='white-content-overlay' style={{
            opacity: opacity
        }}>
            <BlurBackground />
            <div className="settings-container">
                {content}
                <CloseButton cbWhenPressed={handleClose}/>
            </div>
        </div>
    );
}

export { WhiteContentOverlay };