import "./SignInPage.css";
import { Link } from "react-router";

// Form
import SignInForm from "../SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <main>
      <section className="form-section column">
        <SignInForm />
        <div className="link">
          <Link to="/sign-up">Don't have an account?</Link>
        </div>
      </section>
    </main>
  );
}
