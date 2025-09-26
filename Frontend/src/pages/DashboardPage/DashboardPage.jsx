import "./DashboardPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Body from "../../components/Body/Body";
import TripFormModal from "../../components/tripForm/TripFormModal";
import { tripData } from "../../utils/tripData";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState(tripData?.days?.[0] || null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showTripFormModal, setShowTripFormModal] = useState(false);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedSection(null); // Clear section when selecting a day

    // Highlight the selected day on the map
    if (window.mapHighlightDay) {
      window.mapHighlightDay(day.dayNumber);
    }
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedDay(null); // Clear day when selecting a section
  };

  const handleTripFormOpen = () => {
    setShowTripFormModal(true);
  };

  const handleTripFormClose = () => {
    setShowTripFormModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
        selectedSection={selectedSection}
        onSectionSelect={handleSectionSelect}
        onTripFormOpen={handleTripFormOpen}
      />
      <Body
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
        selectedSection={selectedSection}
        onSectionSelect={handleSectionSelect}
      />
      <Map />
      <TripFormModal show={showTripFormModal} onHide={handleTripFormClose} />
    </div>
  );
}
