import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { bookmarkIndex } from "../services/bookmarkService";

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  // * State
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // * Context
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getBookmarkData = async () => {
      if (!user) return;
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

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, setBookmarks, isLoading, error }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkContext, BookmarkProvider };
