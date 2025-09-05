import "./Navbar.css";
import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PetrolContext } from "../../contexts/PetrolContext";
import { IoMdGlasses } from "react-icons/io";
import { MapContext } from "../../contexts/MapContext";

export default function Navbar() {
  const { user, signOut } = useContext(UserContext);
  const { selectedPetrolType, setSelectedPetrolType } =
    useContext(PetrolContext);

  const location = useLocation();
  const showOnMapPage = location.pathname === "/";
  const { center, zoom } = useContext(MapContext);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          PetrolSpy
          <IoMdGlasses />
        </Link>

        {showOnMapPage && (
          <div className="map-control">
            <div className="petrol-filter">
              <label htmlFor="petrol-select">Petrol:</label>
              <select
                id="petrol-select"
                value={selectedPetrolType}
                onChange={(e) => setSelectedPetrolType(e.target.value)}
              >
                <option value="E10">E10</option>
                <option value="U91">U91</option>
                <option value="P95">P95</option>
                <option value="P98">P98</option>
                <option value="PDL">Diesel</option>
                <option value="EV">EV</option>
              </select>
            </div>
            <div className="sidebar">
              Longitude: {center[0].toFixed(4)} | Latitide:
              {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
            </div>
          </div>
        )}
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
            <Link to="/sign-in" className="nav-btn">
              Sign in
            </Link>
            <Link to="/sign-up" className="nav-btn">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
