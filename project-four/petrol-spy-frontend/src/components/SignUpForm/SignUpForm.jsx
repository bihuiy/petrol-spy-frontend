import "./SignUpForm.css";
import { signUp } from "../../services/users";
import { useState } from "react";

export default function SignUpForm() {
  // * State
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  // * Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(formData);
    } catch (error) {
      console.log(error.response.data);

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
      <h1>Create an account</h1>
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

      <button type="submit">Submit</button>
    </form>
  );
}
