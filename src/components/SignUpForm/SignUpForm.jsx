import "./SignUpForm.css";
import { signUp } from "../../services/users";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { getUser, setToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import ImageUploadField from "../ImageUploadField/ImageUploadField";

export default function SignUpForm() {
  // * Context
  const { setUser } = useContext(UserContext);

  // * State
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    profileImage: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState({});

  // * Location variables
  const navigate = useNavigate();

  // * Functions
  const handleSubmit = async (e) => {
    setError({});
    e.preventDefault();
    try {
      const { data } = await signUp(formData);
      setToken(data.access);
      setUser(getUser());
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const setProfileImage = (imageURL) => {
    setFormData({ ...formData, profileImage: imageURL });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      <ImageUploadField
        labelText="Upload a profile image"
        fieldName="profileImage"
        setImage={setProfileImage}
        imageURL={formData.profileImage}
        setIsUploading={setIsUploading}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      {error.email && <p className="error-message">{error.email}</p>}

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      {error.username && <p className="error-message">{error.username}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error.password && <p className="error-message">{error.password}</p>}

      <label htmlFor="password_confirmation">Type your password again</label>
      <input
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        placeholder="confirm password"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      {error.password_confirmation && (
        <p className="error-message">{error.password_confirmation}</p>
      )}

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Image uploading..." : "Create"}
      </button>
    </form>
  );
}
