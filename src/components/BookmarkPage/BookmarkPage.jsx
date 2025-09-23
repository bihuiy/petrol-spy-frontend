import { useContext, useState } from "react";
import "./BookmarkPage.css";
import { UserContext } from "../../contexts/UserContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import StationCard from "../StationCard/StationCard";
import PriceRecordButton from "../PriceRecordButton/PriceRecordButton";
import { searchBookmarks } from "../../utils/bookmarkSearch";
import ErrorPage from "../ErrorPage/ErrorPage";
import Tag from "../Tag/Tag";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import { BookmarkContext } from "../../contexts/BookmarkContext";

export default function BookmarkPage() {
  // * Contexts
  const { user } = useContext(UserContext);
  const { bookmarks, isLoading, error } = useContext(BookmarkContext);

  // * State
  const [query, setQuery] = useState("");

  const filteredBookmarks = searchBookmarks(bookmarks, query);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <main className="bookmark-page">
      <div className="profile-header">
        <img
          src={user?.profileImage}
          alt={`${user?.username}'s avatar`}
          className="profile-avatar"
        />
        <h1>{user?.username}'s bookmarked stations</h1>{" "}
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by name, address or id..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
        />
      </div>
      <div className="bookmark-grid">
        {filteredBookmarks && filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => {
            return (
              <div className="bookmark-card" key={bookmark.id}>
                <StationCard station={bookmark.bookmarked_station} />
                <div className="card-actions">
                  <Tag bookmark={bookmark} />
                  <BookmarkButton station={bookmark.bookmarked_station} />
                  <PriceRecordButton bookmark={bookmark} user={user} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-bookmarks">You don't have bookmarks.</p>
        )}
      </div>
    </main>
  );
}
