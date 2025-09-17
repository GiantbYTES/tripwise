import "./DashboardPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Body from "../../components/Body/Body";

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Body />
      <Map />
    </div>
  );
}
