import { useContext, useEffect, useState } from "react";
import "./BookmarkPage.css";
import { bookmarkIndex } from "../../services/bookmarkService";
import { UserContext } from "../../contexts/UserContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import StationCard from "../StationCard/StationCard";
import PriceRecordButton from "../PriceRecordButton/PriceRecordButton";
import { searchBookmarks } from "../../utils/bookmarkSearch";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function BookmarkPage() {
  // * Contexts
  const { user } = useContext(UserContext);

  // * State
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getBookmarkData = async () => {
      setIsLoading(true);
      try {
        const { data } = await bookmarkIndex();
        setBookmarks(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarkData();
  }, [user]);

  const filteredBookmarks = searchBookmarks(bookmarks, query);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <main className="bookmark-page">
      <h1>{user.username}'s bookmarked stations</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, address or id..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="bookmark-grid">
        {filteredBookmarks && filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <div className="bookmark-card" key={bookmark.id}>
              <StationCard station={bookmark.bookmarked_station} />
              <PriceRecordButton bookmark={bookmark} user={user} />
            </div>
          ))
        ) : (
          <p>You don't have any bookmarks yet.</p>
        )}
      </div>
    </main>
  );
}
