// Mock trip data that can be shared between components
export const mockTripData = {
  tripName: "European Adventure",
  duration: "5 Days",
  totalDistance: "1,247 km",
  days: [
    {
      id: 1,
      date: "2025-10-15",
      dayNumber: 1,
      startLocation: {
        name: "Paris, France",
        address: "Eiffel Tower, Champ de Mars",
        coordinates: { lat: 48.8584, lng: 2.2945 },
        time: "09:00",
      },
      endLocation: {
        name: "Lyon, France",
        address: "Place Bellecour",
        coordinates: { lat: 45.7578, lng: 4.832 },
        time: "18:30",
      },
      distance: "463 km",
      activities: [
        "Visit Eiffel Tower",
        "Seine River Cruise",
        "Drive to Lyon",
        "Evening stroll in Vieux Lyon",
      ],
      accommodation: "Hotel Villa Florentine",
      notes: "Beautiful drive through French countryside. Weather was perfect!",
    },
    {
      id: 2,
      date: "2025-10-16",
      dayNumber: 2,
      startLocation: {
        name: "Lyon, France",
        address: "Place Bellecour",
        coordinates: { lat: 45.7578, lng: 4.832 },
        time: "08:30",
      },
      endLocation: {
        name: "Geneva, Switzerland",
        address: "Jet d'Eau, Lake Geneva",
        coordinates: { lat: 46.2044, lng: 6.1432 },
        time: "17:00",
      },
      distance: "151 km",
      activities: [
        "Lyon Old Town exploration",
        "Basilica of Notre-Dame de Fourvière",
        "Drive to Geneva",
        "Lake Geneva walk",
      ],
      accommodation: "Hotel Beau-Rivage Geneva",
      notes: "Amazing architecture in Lyon. Geneva lakefront is stunning.",
    },
    {
      id: 3,
      date: "2025-10-17",
      dayNumber: 3,
      startLocation: {
        name: "Geneva, Switzerland",
        address: "Jet d'Eau, Lake Geneva",
        coordinates: { lat: 46.2044, lng: 6.1432 },
        time: "09:00",
      },
      endLocation: {
        name: "Milan, Italy",
        address: "Piazza del Duomo",
        coordinates: { lat: 45.4642, lng: 9.19 },
        time: "19:15",
      },
      distance: "287 km",
      activities: [
        "UN Office visit",
        "Alpine drive through Simplon Pass",
        "Arrive in Milan",
        "Duomo evening visit",
      ],
      accommodation: "Hotel Spadari al Duomo",
      notes:
        "Spectacular mountain scenery. Milan's Gothic architecture is breathtaking.",
    },
    {
      id: 4,
      date: "2025-10-18",
      dayNumber: 4,
      startLocation: {
        name: "Milan, Italy",
        address: "Piazza del Duomo",
        coordinates: { lat: 45.4642, lng: 9.19 },
        time: "08:00",
      },
      endLocation: {
        name: "Venice, Italy",
        address: "St. Mark's Square",
        coordinates: { lat: 45.4341, lng: 12.3387 },
        time: "16:45",
      },
      distance: "280 km",
      activities: [
        "La Scala Opera House",
        "Shopping in Quadrilatero",
        "Drive to Venice",
        "Gondola ride",
      ],
      accommodation: "Hotel Danieli Venice",
      notes:
        "Milan's fashion scene is incredible. Venice canals are magical at sunset.",
    },
    {
      id: 5,
      date: "2025-10-19",
      dayNumber: 5,
      startLocation: {
        name: "Venice, Italy",
        address: "St. Mark's Square",
        coordinates: { lat: 45.4341, lng: 12.3387 },
        time: "10:00",
      },
      endLocation: {
        name: "Rome, Italy",
        address: "Colosseum",
        coordinates: { lat: 41.8902, lng: 12.4922 },
        time: "20:30",
      },
      distance: "528 km",
      activities: [
        "Doge's Palace",
        "Murano Island",
        "Long drive to Rome",
        "Colosseum night tour",
      ],
      accommodation: "Hotel Artemide Rome",
      notes:
        "Venice is unique beyond words. Rome welcomes with ancient grandeur.",
    },
  ],
};

// Helper functions to extract map data
export const getAllLocations = () => {
  const locations = [];

  mockTripData.days.forEach((day) => {
    // Add start location
    locations.push({
      ...day.startLocation,
      type: "start",
      dayNumber: day.dayNumber,
      date: day.date,
    });

    // Add end location (but avoid duplicates when end of one day is start of next)
    const isDuplicate = locations.some(
      (loc) =>
        loc.coordinates.lat === day.endLocation.coordinates.lat &&
        loc.coordinates.lng === day.endLocation.coordinates.lng
    );

    if (!isDuplicate) {
      locations.push({
        ...day.endLocation,
        type: "end",
        dayNumber: day.dayNumber,
        date: day.date,
      });
    }
  });

  return locations;
};

export const getAllRoutes = () => {
  return mockTripData.days.map((day) => ({
    id: day.id,
    dayNumber: day.dayNumber,
    date: day.date,
    start: day.startLocation.coordinates,
    end: day.endLocation.coordinates,
    startName: day.startLocation.name,
    endName: day.endLocation.name,
    distance: day.distance,
  }));
};

export const getTripBounds = () => {
  const allCoords = [];

  mockTripData.days.forEach((day) => {
    allCoords.push(day.startLocation.coordinates);
    allCoords.push(day.endLocation.coordinates);
  });

  const lats = allCoords.map((coord) => coord.lat);
  const lngs = allCoords.map((coord) => coord.lng);

  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
};
