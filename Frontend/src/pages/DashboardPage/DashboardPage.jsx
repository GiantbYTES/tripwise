import "./DashboardPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Body from "../../components/Body/Body";
import { mockTripData } from "../../utils/tripData";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState(mockTripData.days[0]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);

    // Highlight the selected day on the map
    if (window.mapHighlightDay) {
      window.mapHighlightDay(day.dayNumber);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar selectedDay={selectedDay} onDaySelect={handleDaySelect} />
      <Body selectedDay={selectedDay} onDaySelect={handleDaySelect} />
      <Map />
    </div>
  );
}
