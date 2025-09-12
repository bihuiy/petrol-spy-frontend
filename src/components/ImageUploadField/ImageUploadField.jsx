import "./ImageUploadField.css";
import { uploadImage } from "../../services/cloudinary";
import { useState } from "react";

export default function ImageUploadField({
  labelText = "upload an image",
  fieldName = "image",
  setImage,
  imageURL,
  setIsUploading,
}) {
  // labelText='upload an image', fieldName ='image' is to set an default value here, could just simply be { labelText, fieldName}

  const [error, setError] = useState("");

  const handleFileUpload = async (e) => {
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      const { data } = await uploadImage(file);
      setImage(data.secure_url);
    } catch (error) {
      console.log(error);
      setError("Image upload failed. Please try again later.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {imageURL && <img className="upload-image" src={imageURL} />}
      {error && <p className="error-message">{error}</p>}

      <label htmlFor={fieldName}>{labelText}</label>
      <input
        type="file"
        name={fieldName}
        id={fieldName}
        onChange={handleFileUpload}
      />
    </>
  );
}
