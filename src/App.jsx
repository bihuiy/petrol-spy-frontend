import { Routes, Route } from "react-router";

// Global components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Page components
import Homepage from "./components/Homepage/Homepage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import BookmarkPage from "./components/BookmarkPage/BookmarkPage";
import PriceRecordPage from "./components/PriceRecordPage/PriceRecordPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />
        <Route path="/price-records" element={<PriceRecordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
