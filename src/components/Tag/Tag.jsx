import "./Tag.css";
import { tagUpdate, tagDelete } from "../../services/bookmarkService";
import { useContext, useState } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContext";

export default function Tag({ bookmark }) {
  // * Context
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  // * State
  const [tagInput, setTagInput] = useState(bookmark.tag || "");

  // * Function
  const handleChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        if (tagInput.trim() !== "") {
          await tagUpdate(bookmark.id, { tag: tagInput });
          setBookmarks(
            bookmarks.map((b) =>
              b.id === bookmark.id ? { ...b, tag: tagInput } : b
            )
          );
        } else {
          await tagDelete(bookmark.id);
          setTagInput("");
          setBookmarks(
            bookmarks.map((b) => (b.id === bookmark.id ? { ...b, tag: "" } : b))
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <input
      id="tagInput"
      name="tagInput"
      type="text"
      placeholder="Tag and Enter..."
      value={tagInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={tagInput === "" ? "tag-input-blank" : "tag-input"}
    />
  );
}
