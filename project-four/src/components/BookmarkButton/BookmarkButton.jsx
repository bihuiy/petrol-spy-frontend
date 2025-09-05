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
import { getUserDetail } from "../../services/users";

export default function BookmarkButton({ station }) {
  //const { user } = useContext(UserContext);

  async function fetchUserData() {
    const { userData } = await getUserDetail();
    //console.log(userData);

    //console.log(userData?.owned_bookmarks);
    return userData;
  }
  fetchUserData();

  /*   const isBookmarked = user?.owned_bookmarks?.some(
    (b) => b.bookmarked_station.station_id === station.station_id
  ); */

  // * State
  const [bookmarked, setBookmarked] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // * Function
  const handleClick = async () => {
    if (!user || !getToken()) return navigate("/sign-up");
    try {
      if (bookmarked) {
        await unbookmarkStation(station.station_id);
      } else {
        await bookmarkStation(station.station_id);
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
