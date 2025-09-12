import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import { useContext } from "react";
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

  const navigate = useNavigate();

  // * Function
  const handleClick = async () => {
    if (!user) return navigate("/sign-up");
    const isBookmarked = bookmarks.some(
      (b) => b.bookmarked_station?.station_id === station?.station_id
    );

    try {
      if (isBookmarked) {
        setBookmarks(
          bookmarks.filter(
            (b) => b.bookmarked_station?.station_id !== station.station_id
          )
        );

        await unbookmarkStation(station.station_id);
      } else {
        const { data } = await bookmarkStation(station.station_id);
        setBookmarks([...bookmarks, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isBookmarkedNow = bookmarks.some((b) => {
    return b.bookmarked_station?.station_id === station?.station_id;
  });

  return (
    <button onClick={handleClick}>
      {isBookmarkedNow ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />}
    </button>
  );
}
