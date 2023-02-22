import "./Thumbnail.scss";

function Thumbnail(props) {
    const { image, handleDrag, handleDrop } = props;

    return (
        <img
            className="thumbnail"
            name={image.name}
            draggable={true}
            onDragOver={event => event.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            alt={image.name}
            src={URL.createObjectURL(image)}
        />
    );
}

export default Thumbnail;