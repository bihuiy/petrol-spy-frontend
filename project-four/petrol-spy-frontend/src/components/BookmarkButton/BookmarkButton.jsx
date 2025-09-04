import { useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import {
  unbookmarkStation,
  bookmarkStation,
} from "../../services/stationService";
import { getToken } from "../../utils/auth";

export default function BookmarkButton({ station, user }) {
  const isBookmarked = user?.owned_bookmarks?.some(
    (b) => b.bookmarked_station.station_id === station.station_id
  );

  // * State
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // * Function
  const handleClick = async () => {
    if (!user || !getToken()) return navigate("/sign-up");
    try {
      if (bookmarked) {
        await unbookmarkStation(station.station_id);
        setBookmarked(false);
      } else {
        await bookmarkStation(station.station_id);
        setBookmarked(true);
      }
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
