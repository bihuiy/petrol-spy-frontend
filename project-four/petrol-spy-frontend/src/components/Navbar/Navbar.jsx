import "./Navbar.css";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <header>
      <div className="brand-logo">
        <Link to="/">PetrolSpy</Link>
      </div>
      <nav>
        <Link to="/sign-in">Sign in</Link>
        <Link to="/sign-up">Sign up</Link>
      </nav>
    </header>
  );
}
