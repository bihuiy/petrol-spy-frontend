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
  }, [user, bookmarks]);

  return (
    <main>
      <h1>{user.username}'s bookmarked stations</h1>
      <div>
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div key={bookmark.id}>
              {bookmark.owner}-{bookmark.bookmarked_station}-{bookmark.tag}
            </div>
          ))
        ) : (
          <p>Currently no bookmarks.</p>
        )}
      </div>
    </main>
  );
}
