import "./SignUpForm.css";
import { signUp } from "../../services/users";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { getUser, setToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";

export default function SignUpForm() {
  // * Context
  const { setUser } = useContext(UserContext);

  // * State
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  // * Location variables
  const navigate = useNavigate();

  // * Functions
  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      const { data } = await signUp(formData);
      setToken(data.access);
      setUser(getUser());
      navigate("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <p className="error-message">{errors.username}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error-message">{errors.password}</p>}

      <label htmlFor="password_confirmation">Type your password again</label>
      <input
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        placeholder="confirm password"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      {errors.password_confirmation && (
        <p className="error-message">{errors.password_confirmation}</p>
      )}

      <button type="submit">Create</button>
    </form>
  );
}
