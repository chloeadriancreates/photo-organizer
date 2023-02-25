import "./Thumbnail.scss";

function Thumbnail(props) {
    const { image, handleDrag, handleDrop, deleteImage } = props;

    return (
        <div className="thumbnail">
            <img
            className="thumbnail-img"
            name={image.name}
            draggable={true}
            onDragOver={event => event.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            alt={image.name}
            src={URL.createObjectURL(image)}
            />
            <button className="thumbnail-button" onClick={() => { deleteImage(image); }}>Delete</button>
        </div>
    );
}

export default Thumbnail;