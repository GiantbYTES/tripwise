import "./DashboardPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Body from "../../components/Body/Body";
import TripFormModal from "../../components/tripForm/TripFormModal";
import { TripDataManager } from "../../utils/tripDataManager";
// Import test utilities for development
import "../../utils/testUtils";

export default function DashboardPage() {
  const [hasGeneratedTrip, setHasGeneratedTrip] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showTripFormModal, setShowTripFormModal] = useState(false);

  // Development note: You can test different states in the browser console:
  // - clearTripData() to test empty state
  // - addMockTripData() to test with trip data

  // Check for existing trip data on component mount
  useEffect(() => {
    const checkForTripData = () => {
      const hasSaved = TripDataManager.hasSavedTripPlan();
      setHasGeneratedTrip(hasSaved);

      if (hasSaved) {
        const savedData = TripDataManager.getSavedTripPlan();
        if (savedData && savedData.tripPlan) {
          setTripData(savedData.tripPlan);
          setSelectedDay(savedData.tripPlan.days?.[0] || null);
        }
      }
    };

    checkForTripData();
  }, []);

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
    // Check again for trip data after modal closes (in case a new trip was generated)
    const hasSaved = TripDataManager.hasSavedTripPlan();
    setHasGeneratedTrip(hasSaved);

    if (hasSaved) {
      const savedData = TripDataManager.getSavedTripPlan();
      if (savedData && savedData.tripPlan) {
        setTripData(savedData.tripPlan);
        setSelectedDay(savedData.tripPlan.days?.[0] || null);
      }
    }
  };

  return (
    <div
      className={`dashboard-container ${
        !hasGeneratedTrip ? "no-trip-data" : ""
      }`}
    >
      <Sidebar
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
        selectedSection={selectedSection}
        onSectionSelect={handleSectionSelect}
        onTripFormOpen={handleTripFormOpen}
        tripData={tripData}
        hasGeneratedTrip={hasGeneratedTrip}
      />
      {hasGeneratedTrip && (
        <Body
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
          selectedSection={selectedSection}
          onSectionSelect={handleSectionSelect}
        />
      )}
      <Map tripData={tripData} hasGeneratedTrip={hasGeneratedTrip} />
      <TripFormModal show={showTripFormModal} onHide={handleTripFormClose} />
    </div>
  );
}
