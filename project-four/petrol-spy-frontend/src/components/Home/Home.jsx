import { useEffect, useState } from "react";
import { stationIndex } from "../../services/stationService";
import "./Home.css";

export default function Home() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStationData = async () => {
      try {
        const { data } = await stationIndex();
        setStations(data.stations);
      } catch (error) {
        setError();
      }
    };
    getStationData();
  }, []);
  return (
    <main>
      <h1>Hello</h1>
      {stations.map((station) => {
        return <h2 key={station.id}>{station.name}</h2>;
      })}
    </main>
  );
}
