import "./Home.scss";
import { useState } from "react";
import { downloadZip } from "client-zip";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import Button from "../../components/Button/Button";

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
      <div className="home">
        <div className="home-images">
          { selectedImages && selectedImages.map((image) =>
            <Thumbnail key={image.id} image={image} handleDrag={handleDrag} handleDrop={handleDrop} />
          )}
        </div>
        <input
          id="upload-hidden"
          tabIndex="-1"
          type="file"
          name="photos"
          multiple
          onChange={event => uploadImages(event.target.files)}
        />
        <div className="home-buttons">
          <Button content="Upload photos" handleClick={() => {
            document.getElementById("upload-hidden").click();
          }} />
          <Button content="Download zip" handleClick={downloadImages} />
        </div>
      </div>
    );
}

export default Home;
