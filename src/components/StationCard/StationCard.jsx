import "./StationCard.css";
import BookmarkButton from "../BookmarkButton/BookmarkButton";

export default function StationCard({ station }) {
  if (!station) return null;
  return (
    <div className="station-card">
      <div className="station-name">
        {station.name} (ID {station.station_id})
      </div>

      <div className="station-address">
        {station.address}
        <hr />
      </div>

      <div className="station-prices">
        {station.prices.map((fuel) => (
          <div className="price-item" key={fuel.id}>
            <span className="fuel-type">{fuel.fuel_type}</span>:{" "}
            <span className="fuel-price">{fuel.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
