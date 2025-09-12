import "./Tag.css";
import { tagUpdate, tagDelete } from "../../services/bookmarkService";
import { useState } from "react";

export default function Tag({ bookmark }) {
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
        } else {
          await tagDelete(bookmark.id);
          setTagInput("");
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
