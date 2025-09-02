import { Routes, Route } from "react-router";

// Global components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Page components
import Home from "./components/HomePage/HomePage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import Bookmark from "./components/Bookmark/Bookmark";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/bookmarks" element={<Bookmark />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
