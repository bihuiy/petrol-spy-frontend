import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import {
  unbookmarkStation,
  bookmarkStation,
} from "../../services/stationService";
import { getToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import { bookmarkIndex } from "../../services/bookmarkService";

export default function BookmarkButton({ station }) {
  const { user } = useContext(UserContext);

  // * State
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // * Fetch all bookmarks on mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await bookmarkIndex();
        setBookmarks(data);
        const isBookmarked = data.some(
          (b) => b.bookmarked_station.station_id === station.station_id
        );
        setBookmarked(isBookmarked);
      } catch (error) {
        setError(error);
      }
    };

    fetchBookmarks();
  }, [station?.station_id]);

  // * Function
  const handleClick = async () => {
    if (!user || !getToken()) return navigate("/sign-up");
    try {
      if (bookmarked) {
        await unbookmarkStation(station.station_id);
        setBookmarks(
          bookmarks.filter((b) => {
            b.bookmarked_station.station_id !== station.station_id;
          })
        );
      } else {
        const newBookmark = await bookmarkStation(station.station_id);
        setBookmarks([...bookmarks, newBookmark]);
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <button onClick={handleClick}>
      {bookmarked ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />}
    </button>
  );
}
