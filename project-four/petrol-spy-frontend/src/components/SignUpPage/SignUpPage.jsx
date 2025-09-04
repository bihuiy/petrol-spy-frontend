import "./SignUpPage.css";
import { Link } from "react-router";

// Form
import SignUpForm from "../SignUpForm/SignUpForm";

export default function SignUpPage() {
  return (
    <main>
      <section className="form-section column">
        <SignUpForm />
        <Link to="/sign-in">Already have an account?</Link>
      </section>
    </main>
  );
}
