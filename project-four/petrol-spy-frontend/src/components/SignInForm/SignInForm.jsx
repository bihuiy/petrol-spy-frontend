import { signIn } from "../../services/users";
import "./SignInForm.css";
import { useState, useContext } from "react";
import { getUser, setToken } from "../../utils/auth";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function SignInForm() {
  // * Context
  const { setUser } = useContext(UserContext);

  // * State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // * Location variables
  const navigate = useNavigate();

  // * Functions
  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      const { data } = await signIn(formData);
      setToken(data.access);
      setUser(getUser());
      navigate("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <label htmlFor="username">Username or email address</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Your username or email"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.detail && <p className="error-message">{errors.detail}</p>}

      <button type="submit">Sign in</button>
    </form>
  );
}
