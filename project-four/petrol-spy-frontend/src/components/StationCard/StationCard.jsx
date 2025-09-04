import "./StationCard.css";
import BookmarkButton from "../BookmarkButton/BookmarkButton";

export default function StationCard({ station, user }) {
  return (
    <div className="station-card">
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>{station?.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Address</strong>
            </td>
            <td>{station?.address}</td>
          </tr>
          <tr>
            <td>
              <strong>Price</strong>
            </td>
            <td>
              {station?.prices?.map((p) => (
                <div key={p.id}>
                  {p.fuel_type}:{p.price}
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <BookmarkButton station={station} user={user} />
    </div>
  );
}
