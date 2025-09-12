import "./PriceRecordCard.css";

export default function PriceRecordCard({ priceRecord }) {
  if (!priceRecord) return null;

  const { timestamp, bookmark_detail, snapshot_price } = priceRecord;
  const { bookmarked_station } = bookmark_detail || {};
  const { station_id, name, address } = bookmarked_station || {};

  return (
    <>
      <div className="price-record-name">
        {name} (ID {station_id})
      </div>

      <div className="price-record-address">{address}</div>

      <div className="snapshot-time">
        Snapshpt Time: {new Date(timestamp).toLocaleString()}
        <hr />
      </div>

      <div className="price-record-prices">
        {snapshot_price.map((fuel) => (
          <div className="price-item" key={fuel.id}>
            <span className="fuel-type">{fuel.fuel_type}</span>:{" "}
            <span className="fuel-price">{fuel.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}
