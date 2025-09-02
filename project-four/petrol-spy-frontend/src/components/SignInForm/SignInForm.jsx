import { signIn } from "../../services/users";
import "./SignInForm.css";
import { useState } from "react";

export default function SignInForm() {
  // * State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(formData);
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
      {errors.email && <p className="error-message">{errors.email}</p>}

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

      <button type="submit">Sign in</button>
    </form>
  );
}
