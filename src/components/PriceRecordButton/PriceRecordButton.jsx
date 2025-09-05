import "./PriceRecordButton.css";
import { MdAddAPhoto } from "react-icons/md";
import { priceRecordCreate } from "../../services/priceRecordService";

export default function PriceRecordButton({ bookmark }) {
  const handleClick = async () => {
    const snapshotPrice = bookmark.bookmarked_station.prices.map((p) => ({
      fuel_type: p.fuel_type,
      price: parseFloat(p.price),
    }));

    try {
      await priceRecordCreate({
        bookmark: bookmark.id,
        owner: bookmark.owner,
        snapshot_price: snapshotPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick}>
      <MdAddAPhoto />
    </button>
  );
}
