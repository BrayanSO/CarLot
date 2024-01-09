// ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = ({ onImageChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    const imageArray = Array.from(imageFiles).map((file) => ({
      id: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages(imageArray);
    onImageChange(imageArray); // Llama a la función proporcionada por el padre para manejar las imágenes
  };

  return (
    <div>
      <label>Photos:</label> <br />
      <input type="file" name="images" accept="image/*" multiple={true} onChange={handleImageChange} />

      {images.length > 0 &&  (
        <div className="image-preview">
          {images.map((image) => (
            <img key={image.id} src={image.url} alt={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
