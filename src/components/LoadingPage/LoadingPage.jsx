import "./LoadingPage.css";
import spinner from "../../assets/spinner.gif";

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <img src={spinner} alt="spinner" className="spinner" />
      <h1>Loading...</h1>
    </div>
  );
}
