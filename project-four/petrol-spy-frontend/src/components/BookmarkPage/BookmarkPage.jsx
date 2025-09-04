import { useContext, useEffect, useState } from "react";
import "./BookmarkPage.css";
import { bookmarkIndex } from "../../services/bookmarkService";
import { UserContext } from "../../contexts/UserContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import StationCard from "../StationCard/StationCard";
import PriceRecordButton from "../PriceRecordButton/PriceRecordButton";
import { searchBookmarks } from "../../utils/bookmarkSearch";

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
        console.log(data);

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

  return (
    <main>
      <h1>{user.username}'s bookmarked stations</h1>
      <div>
        {filteredBookmarks && filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <div key={bookmark.id}>
              <StationCard station={bookmark.bookmarked_station} user={user} />
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
