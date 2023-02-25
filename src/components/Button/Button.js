import "./Button.scss";

function Button(props) {
    const { content, handleClick } = props;
    return (
        <button className="button" onClick={handleClick} >{content}</button>
    );
}

export default Button;