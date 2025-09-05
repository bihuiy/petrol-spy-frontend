import "./PriceRecordCard.css";

export default function PriceRecordCard({ priceRecord }) {
  if (!priceRecord) return null;

  const { timestamp, bookmark_detail, snapshot_price } = priceRecord;
  const { bookmarked_station } = bookmark_detail || {};
  const { station_id, name, address } = bookmarked_station || {};

  return (
    <div>
      <h3>
        {name} (ID {station_id})
      </h3>
      <p>{address}</p>
      <p>Snapshot Time: {new Date(timestamp).toLocaleString()}</p>
      <table className="price-table">
        <thead>
          <tr>
            {snapshot_price.map((fuel) => (
              <th key={fuel.fuel_type}>{fuel.fuel_type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {snapshot_price.map((fuel) => (
              <td key={fuel.fuel_type}>{fuel.price.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
