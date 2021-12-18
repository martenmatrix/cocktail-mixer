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

    return (
        <div className='white-content-overlay'>
            <BlurBackground />
            <div className="settings-container">
                {content}
                <CloseButton cbWhenPressed={closecb}/>
            </div>
        </div>
    );
}

export { WhiteContentOverlay };