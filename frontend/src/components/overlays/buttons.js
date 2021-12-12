import '../styles/buttons.css';

function DangerButton(props) {
    const text = props.children;
    const cb = props.onClick;

    return (
        <div className="button red" onClick={cb}>
            {text}
        </div>
    )
}

function NormalButton(props) {
    const text = props.children;
    const cb = props.onClick;

    return (
        <div className="button green" onClick={cb}>
            {text}
        </div>
    )
}

export { DangerButton, NormalButton };