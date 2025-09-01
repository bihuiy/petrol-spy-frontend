import { Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Bookmark from "./components/Bookmark/Bookmark";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmark />} />
      </Routes>
    </>
  );
}
export default App;
