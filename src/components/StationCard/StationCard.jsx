import "./StationCard.css";
import BookmarkButton from "../BookmarkButton/BookmarkButton";

export default function StationCard({ station }) {
  return (
    <div className="station-card">
      <div className="station-info">
        <div className="station-name">
          {station?.name} (ID {station?.station_id})
        </div>

        <div className="station-address">
          {station?.address}
          <hr />
        </div>

        <div className="station-prices">
          {station?.prices?.map((p) => (
            <div className="price-item" key={p.id}>
              <span className="fuel-type">{p.fuel_type}</span>:{" "}
              <span className="fuel-price">{p.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
