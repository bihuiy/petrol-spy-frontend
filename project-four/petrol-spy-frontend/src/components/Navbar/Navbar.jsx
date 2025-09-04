import "./Navbar.css";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Navbar() {
  const { user, signOut } = useContext(UserContext);

  return (
    <header>
      <div className="brand-logo">
        <Link to="/">PetrolSpy</Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/bookmarks">{user.username}'s Bookmarks</Link>
            <Link to="/price-records">{user.username}'s Price Records</Link>
            <Link to="/sign-in" onClick={signOut}>
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign in</Link>
            <Link to="/sign-up">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
