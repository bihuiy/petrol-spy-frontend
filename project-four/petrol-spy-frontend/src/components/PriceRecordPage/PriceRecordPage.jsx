import { useContext, useEffect, useState } from "react";
import "./PriceRecordPage.css";
import { UserContext } from "../../contexts/UserContext";
import { priceRecordIndex } from "../../services/priceRecordService";

export default function PriceRecordPage() {
  // * Contexts
  const { user } = useContext(UserContext);
  // * State
  const [priceRecord, setPriceRecord] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPriceRecordData = async () => {
      try {
        const { data } = await priceRecordIndex();
        setPriceRecord(data);
      } catch (error) {
        setError(error);
      }
    };
    getPriceRecordData();
  }, [user, priceRecord]);

  return (
    <main>
      <h1>{user.username}'s price record</h1>
    </main>
  );
}
