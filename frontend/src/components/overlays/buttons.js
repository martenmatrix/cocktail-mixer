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

function AttentionButton(props) {
    const text = props.children;
    const cb = props.onClick;
    const onMouseDown = props.onMouseDown;
    const onMouseUp = props.onMouseUp;
    const onMouseLeave = props.onMouseLeave;

    return (
        <div className="button attention" onClick={cb} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
            {text}
        </div>
    )
}

function RemoveButton(props) {
    const text = props.children;
    const cb = props.onClick;

    return (
        <button onClick={cb} className="remove">
            {text}
        </button>
    )
}

function AddButton(props) {
    return (
        <button class="icon-btn add-btn">
            <div class="add-icon"></div>
            <div class="btn-txt">Remove</div>
        </button>
    )
}
export { DangerButton, NormalButton, AttentionButton, RemoveButton, AddButton };