import { useContext, useEffect, useState } from "react";
import "./PriceRecordPage.css";
import { UserContext } from "../../contexts/UserContext";
import { priceRecordIndex } from "../../services/priceRecordService";
import LoadingPage from "../LoadingPage/LoadingPage";
import PriceRecordCard from "../PriceRecordCard/PriceRecordCard";
import { searchRecords } from "../../utils/recordSearch";
import { MdDelete } from "react-icons/md";
import { priceRecordDelete } from "../../services/priceRecordService";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function PriceRecordPage() {
  // * Contexts
  const { user } = useContext(UserContext);
  // * State
  const [priceRecords, setPriceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getPriceRecordData = async () => {
      setIsLoading(true);
      try {
        const { data } = await priceRecordIndex();
        setPriceRecords(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPriceRecordData();
  }, [user]);

  // * Function
  const handleClick = async (priceRecordId) => {
    if (!user) return navigate("/sign-up");
    try {
      setPriceRecords(priceRecords.filter((p) => p.id !== priceRecordId));
      await priceRecordDelete(priceRecordId);
    } catch (error) {
      setError(error);
    }
  };

  const filteredRecords = searchRecords(priceRecords, query);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <main className="price-record-page">
      <h1>{user.username}'s price record</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, address or id..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
        />
      </div>
      <div className="price-record-grid">
        {filteredRecords && filteredRecords.length > 0 ? (
          filteredRecords.map((priceRecord) => (
            <div className="price-record-card" key={priceRecord.id}>
              <PriceRecordCard priceRecord={priceRecord} />
              <button onClick={() => handleClick(priceRecord.id)}>
                <MdDelete />
              </button>
            </div>
          ))
        ) : (
          <p className="empty-bookmarks">You don't have records.</p>
        )}
      </div>
    </main>
  );
}
