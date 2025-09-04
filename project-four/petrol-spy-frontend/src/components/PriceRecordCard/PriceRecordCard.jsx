import "./PriceRecordCard.css";

export default function PriceRecordCard({ priceRecord }) {
  if (!priceRecord) return null;

  const { timestamp, bookmark_detail, snapshot_price } = priceRecord;
  const { bookmarked_station } = bookmark_detail || {};
  const { station_id, name, address } = bookmarked_station || {};

  return (
    <div className="price-record-card">
      <h3>
        {name} (ID {station_id})
      </h3>
      <p>{address}</p>
      <p>
        <strong>Snapshot Time:</strong> {new Date(timestamp).toLocaleString()}
      </p>

      <table className="price-table">
        <thead>
          <tr>
            <th>Fuel Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {snapshot_price.map((fuel, index) => (
            <tr key={index}>
              <td>{fuel.fuel_type}</td>
              <td>{fuel.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
