import { useContext, useEffect, useState } from "react";
import "./PriceRecordPage.css";
import { UserContext } from "../../contexts/UserContext";
import { priceRecordIndex } from "../../services/priceRecordService";
import LoadingPage from "../LoadingPage/LoadingPage";
import PriceRecordCard from "../PriceRecordCard/PriceRecordCard";
import { searchRecords } from "../../utils/recordSearch";

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
        console.log(data); //???

        setPriceRecords(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPriceRecordData();
  }, [user]);

  const filteredRecords = searchRecords(priceRecords, query);

  if (isLoading) return <LoadingPage />;

  return (
    <main>
      <h1>{user.username}'s price record</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, address or id..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        {filteredRecords && filteredRecords.length > 0 ? (
          filteredRecords.map((priceRecord) => (
            <div key={priceRecord.id}>
              <PriceRecordCard priceRecord={priceRecord} />
            </div>
          ))
        ) : (
          <p>You don't have any records yet.</p>
        )}
      </div>
    </main>
  );
}
