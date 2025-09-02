import "./SignInPage.css";

// Form
import SignInForm from "../SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <main>
      <section className="form-section column">
        <SignInForm />
      </section>
    </main>
  );
}
