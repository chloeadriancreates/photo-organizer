import "./Home.css";
import { useEffect, useState } from "react";
import { downloadZip } from "client-zip";

function Home() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [dragged, setDragged] = useState("");

    const uploadImages = (images) => {
      let newArray = [];
      if(images.length) {
        newArray.push.apply(newArray, images);
        newArray.map(image => image.id = newArray.indexOf(image));
      }
      setSelectedImages(newArray);
    };

    const handleDrag = (event) => {
      setDragged(event.currentTarget.name);
    };

    const handleDrop = (event) => {
      const dragImage = selectedImages.find(image => image.name === dragged);
      const dropImage = selectedImages.find(image => image.name === event.currentTarget.name);

      const dragImageId = dragImage.id;
      const dropImageId = dropImage.id;

      const newImages = selectedImages
      .map(image => {
        if (image.name === dragged) {
          image.id = dropImageId;
        }
        if (image.name === event.currentTarget.name) {
          image.id = dragImageId;
        }

        const extension = image.name.split(".").pop();
        const newImage = new File([image], `Photo--${image.id + 1}.${extension}`, {type: image.type});
        newImage.id = image.id;
        return newImage;
      });

      setSelectedImages(newImages.sort((a, b) => a.id - b.id));
    };

    const downloadImages = async() => {
      const blob = await downloadZip(selectedImages).blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "images.zip";
      link.click();
      link.remove();
    };

    return (
      <div className="App">
        <h1>Photo organizer</h1>
        { selectedImages && selectedImages.map((image) =>
          <img
          name={image.name}
          key={image.id}
          draggable={true}
          onDragOver={event => event.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          alt={image.name}
          width={"250px"}
          src={URL.createObjectURL(image)} />
        )}
        <br />
        <br />
        <input
          type="file"
          name="myImage"
          multiple
          onChange={event => uploadImages(event.target.files)}
        />
        <button onClick={downloadImages}>My Example Doc</button>
      </div>
    );
}

export default Home;
