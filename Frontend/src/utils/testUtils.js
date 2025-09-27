// Utility functions for testing the dashboard in different states

export const clearTripData = () => {
  try {
    localStorage.removeItem("generatedTripPlan");
    localStorage.removeItem("originalFormData");
    localStorage.removeItem("tripPlanTimestamp");
    localStorage.removeItem("draftTripForm");
    localStorage.removeItem("draftTimestamp");

    console.log("All trip data cleared from localStorage");

    // Reload the page to see the empty state
    window.location.reload();

    return true;
  } catch (error) {
    console.error("Error clearing trip data:", error);
    return false;
  }
};

export const addMockTripData = () => {
  try {
    // Create a simple mock trip data
    const mockTrip = {
      tripName: "Test Trip",
      duration: "3 Days",
      totalDistance: "450 km",
      dateRange: {
        startDate: "2025-01-15",
        endDate: "2025-01-17",
      },
      days: [
        {
          id: 1,
          date: "2025-01-15",
          dayNumber: 1,
          startLocation: {
            name: "London, UK",
            address: "Big Ben, Westminster",
            coordinates: { lat: 51.5007, lng: -0.1246 },
            time: "09:00",
          },
          endLocation: {
            name: "Paris, France",
            address: "Eiffel Tower, Champ de Mars",
            coordinates: { lat: 48.8584, lng: 2.2945 },
            time: "18:00",
          },
          distance: "150 km",
          activities: ["Visit Big Ben", "Channel Tunnel", "Arrive in Paris"],
          accommodation: "Hotel Example",
          notes: "Great start to the trip!",
        },
      ],
    };

    localStorage.setItem("generatedTripPlan", JSON.stringify(mockTrip));
    localStorage.setItem("tripPlanTimestamp", new Date().toISOString());

    console.log("Mock trip data added to localStorage");

    // Reload the page to see the trip data
    window.location.reload();

    return true;
  } catch (error) {
    console.error("Error adding mock trip data:", error);
    return false;
  }
};

// Expose these functions to the global window object for easy testing in the browser console
if (typeof window !== "undefined") {
  window.clearTripData = clearTripData;
  window.addMockTripData = addMockTripData;
}
