import { useContext, useEffect, useState } from "react";
import "./BookmarkPage.css";
import { bookmarkIndex } from "../../services/bookmarkService";
import { UserContext } from "../../contexts/UserContext";

export default function BookmarkPage() {
  // * Contexts
  const { user } = useContext(UserContext);

  // * State
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookmarkData = async () => {
      try {
        const { data } = await bookmarkIndex();
        setBookmarks(data);
      } catch (error) {
        setError(error);
      }
    };
    getBookmarkData();
  }, [bookmarks]);

  return (
    <main>
      <h1>{user.username}'s bookmarked stations</h1>
    </main>
  );
}
