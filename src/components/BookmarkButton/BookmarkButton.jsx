import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import {
  bookmarkStation,
  unbookmarkStation,
} from "../../services/stationService";

export default function BookmarkButton({ station }) {
  // * Context
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);
  // * State
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks.some(
      (b) => b.bookmarked_station?.station_id === station?.station_id
    )
  );

  const navigate = useNavigate();

  // * Function
  const handleClick = async () => {
    if (!user) return navigate("/sign-up");
    try {
      if (isBookmarked) {
        setBookmarks(
          bookmarks.filter(
            (b) => b.bookmarked_station?.station_id !== station.station_id
          )
        );
        setIsBookmarked(false);
        await unbookmarkStation(station.station_id);
      } else {
        const newBookmark = await bookmarkStation(station.station_id);
        setBookmarks([...bookmarks, newBookmark]);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick}>
      {isBookmarked ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />}
    </button>
  );
}
