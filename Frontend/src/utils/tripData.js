// Mock trip data that can be shared between components
export const mockTripData = {
  tripName: "European Adventure",
  duration: "5 Days",
  totalDistance: "1,247 km",
  dateRange: {
    startDate: "2025-10-15",
    endDate: "2025-10-19",
  },
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

  // Explore Section Data
  explore: {
    news: [
      {
        id: 1,
        location: "Paris, France",
        date: "2025-10-15",
        articles: [
          {
            title: "Louvre Museum Opens New Egyptian Wing",
            summary:
              "The world-famous museum unveils its expanded Egyptian collection with 500 new artifacts.",
            relevance: "Must-see attraction during your Paris visit",
            source: "Paris Tourism Board",
            publishDate: "2025-10-10",
          },
          {
            title: "Seine River Festival - October 2025",
            summary:
              "Special evening cruises with live music and local cuisine throughout October.",
            relevance: "Perfect timing for your river cruise activity",
            source: "Paris Events",
            publishDate: "2025-10-12",
          },
          {
            title: "Metro Line 14 Extension Opens",
            summary:
              "New metro extension makes getting to Eiffel Tower even easier for tourists.",
            relevance: "Improved transportation to your planned activities",
            source: "RATP",
            publishDate: "2025-10-08",
          },
        ],
      },
      {
        id: 2,
        location: "Lyon, France",
        date: "2025-10-16",
        articles: [
          {
            title: "Festival of Lights Preparation Begins",
            summary:
              "Lyon prepares for its famous December festival with new light installations being tested.",
            relevance: "Get a sneak peek of installations during your visit",
            source: "Lyon City Council",
            publishDate: "2025-10-13",
          },
          {
            title: "Vieux Lyon Restoration Project Completed",
            summary:
              "Historic old town completes major restoration, revealing stunning medieval architecture.",
            relevance: "Perfect timing to explore the newly restored old town",
            source: "Lyon Heritage",
            publishDate: "2025-10-11",
          },
        ],
      },
      {
        id: 3,
        location: "Geneva, Switzerland",
        date: "2025-10-17",
        articles: [
          {
            title: "UN Climate Summit Side Events",
            summary:
              "Special public exhibitions and talks happening at UN headquarters during your visit.",
            relevance: "Free events you can attend during your UN Office visit",
            source: "UN Geneva",
            publishDate: "2025-10-14",
          },
          {
            title: "Lake Geneva Water Levels at Optimal Height",
            summary:
              "Perfect weather conditions create ideal lake views and water activities.",
            relevance: "Best conditions for your lakefront walk",
            source: "Swiss Tourism",
            publishDate: "2025-10-15",
          },
        ],
      },
      {
        id: 4,
        location: "Milan, Italy",
        date: "2025-10-18",
        articles: [
          {
            title: "Milan Fashion Week Extended Events",
            summary:
              "Post-fashion week exhibitions continue with designer showcases in Quadrilatero district.",
            relevance: "Special fashion exhibits during your shopping day",
            source: "Milano Fashion",
            publishDate: "2025-10-16",
          },
          {
            title: "La Scala's New Season Opens",
            summary:
              "Opera house begins new season with special backstage tours for visitors.",
            relevance: "Enhanced experience available for your La Scala visit",
            source: "Teatro alla Scala",
            publishDate: "2025-10-17",
          },
        ],
      },
      {
        id: 5,
        location: "Venice, Italy",
        date: "2025-10-19",
        articles: [
          {
            title: "Venice Biennale Architecture Exhibition Extended",
            summary:
              "International architecture exhibition extended through October with new installations.",
            relevance: "World-class art exhibition available during your visit",
            source: "Venice Biennale",
            publishDate: "2025-10-18",
          },
          {
            title: "Murano Glass Festival Concludes",
            summary:
              "Annual glass-making festival ends with special demonstrations and workshops.",
            relevance: "Catch the final demonstrations on Murano Island",
            source: "Murano Tourism",
            publishDate: "2025-10-19",
          },
        ],
      },
      {
        id: 6,
        location: "Rome, Italy",
        date: "2025-10-19",
        articles: [
          {
            title: "Colosseum Night Tours Expanded",
            summary:
              "Popular evening tours now available with extended hours and new VR experiences.",
            relevance: "Perfect for your planned night tour",
            source: "Rome Tourism",
            publishDate: "2025-10-17",
          },
          {
            title: "Vatican Museums Introduce New Audio Guide",
            summary:
              "Revolutionary new audio guides with AR features now available for visitors.",
            relevance: "Enhanced museum experience if you plan to visit",
            source: "Vatican City",
            publishDate: "2025-10-16",
          },
        ],
      },
    ],

    recommendations: [
      {
        id: 1,
        category: "Restaurants",
        location: "Paris, France",
        items: [
          {
            name: "Le Comptoir du Relais",
            type: "Bistro",
            description:
              "Authentic Parisian bistro experience with traditional French cuisine",
            rating: 4.5,
            priceRange: "€€€",
            address: "9 Carrefour de l'Odéon, 75006 Paris",
            nearbyAttraction: "Close to Seine River cruise departure point",
          },
          {
            name: "Breizh Café",
            type: "Crêperie",
            description: "Modern twist on traditional Breton crêpes",
            rating: 4.3,
            priceRange: "€€",
            address: "109 Rue Vieille du Temple, 75003 Paris",
            nearbyAttraction: "Walking distance from Eiffel Tower",
          },
        ],
      },
      {
        id: 2,
        category: "Activities",
        location: "Lyon, France",
        items: [
          {
            name: "Traboules Walking Tour",
            type: "Cultural Tour",
            description:
              "Explore Lyon's hidden passageways and Renaissance courtyards",
            rating: 4.7,
            duration: "2 hours",
            price: "€15",
            bookingRequired: true,
            nearbyAttraction: "Starts from Vieux Lyon",
          },
          {
            name: "Les Halles de Lyon Paul Bocuse",
            type: "Food Market",
            description: "Famous food market with local specialties",
            rating: 4.6,
            price: "Free entry",
            openingHours: "7:00 AM - 7:00 PM",
            nearbyAttraction: "Near Basilica of Notre-Dame de Fourvière",
          },
        ],
      },
      {
        id: 3,
        category: "Shopping",
        location: "Milan, Italy",
        items: [
          {
            name: "Galleria Vittorio Emanuele II",
            type: "Luxury Shopping",
            description: "Historic shopping gallery with high-end brands",
            rating: 4.8,
            priceRange: "€€€€",
            address: "Piazza del Duomo, 20123 Milano",
            nearbyAttraction: "Connected to Piazza del Duomo",
          },
          {
            name: "Brera District",
            type: "Boutique Shopping",
            description: "Artisan shops and independent boutiques",
            rating: 4.4,
            priceRange: "€€€",
            address: "Brera District, Milano",
            nearbyAttraction: "Near La Scala Opera House",
          },
        ],
      },
      {
        id: 4,
        category: "Cultural Sites",
        location: "Venice, Italy",
        items: [
          {
            name: "Palazzo Grassi",
            type: "Art Museum",
            description: "Contemporary art exhibitions in historic palace",
            rating: 4.4,
            ticketPrice: "€20",
            address: "Campo San Samuele, 3231, 30124 Venezia",
            nearbyAttraction: "Short walk from St. Mark's Square",
          },
          {
            name: "Libreria Acqua Alta",
            type: "Unique Bookstore",
            description:
              "Books stored in gondolas and bathtubs - Instagram famous!",
            rating: 4.6,
            price: "Free to browse",
            address: "Castello, 5176/b, 30122 Venezia",
            nearbyAttraction: "Between Doge's Palace and your route to Murano",
          },
        ],
      },
    ],

    tips: [
      {
        id: 1,
        category: "Transportation",
        location: "General",
        tips: [
          {
            title: "European Road Trip Essentials",
            content:
              "Get an International Driving Permit before traveling. Most European countries require it for non-EU drivers.",
            importance: "Critical",
            timing: "Before departure",
          },
          {
            title: "Toll Roads Navigation",
            content:
              "Download the Michelin app for real-time toll costs and alternative routes. France and Italy have extensive toll systems.",
            importance: "High",
            timing: "Before departure",
          },
          {
            title: "City Center Driving",
            content:
              "Many European city centers have restricted driving zones (ZTL in Italy). Park outside and use public transport.",
            importance: "High",
            timing: "Upon arrival in each city",
          },
        ],
      },
      {
        id: 2,
        category: "Cultural",
        location: "General",
        tips: [
          {
            title: "Museum Reservations",
            content:
              "Book major attractions in advance. Louvre, Vatican, and Doge's Palace require timed entry tickets.",
            importance: "Critical",
            timing: "1-2 weeks before travel",
          },
          {
            title: "Dining Etiquette",
            content:
              "Lunch is typically 12-2 PM, dinner starts at 7:30 PM. Many restaurants close between 3-7 PM.",
            importance: "Medium",
            timing: "Throughout trip",
          },
          {
            title: "Language Basics",
            content:
              "Learn basic greetings in French and Italian. 'Bonjour/Bonsoir' in France, 'Buongiorno/Buonasera' in Italy.",
            importance: "Medium",
            timing: "Before departure",
          },
        ],
      },
      {
        id: 3,
        category: "Practical",
        location: "Specific Cities",
        tips: [
          {
            title: "Venice Navigation",
            content:
              "Download offline maps. Venice's streets are confusing and GPS can be unreliable in narrow alleys.",
            importance: "High",
            timing: "Before arriving in Venice",
          },
          {
            title: "Swiss Currency",
            content:
              "Switzerland uses Swiss Francs (CHF), not Euros. Most places accept cards, but have some cash for small vendors.",
            importance: "Medium",
            timing: "Before entering Switzerland",
          },
          {
            title: "Milan Fashion District",
            content:
              "The Quadrilatero della Moda has luxury prices. For better deals, visit during sale seasons (January-February, July-August).",
            importance: "Low",
            timing: "During Milan visit",
          },
        ],
      },
    ],
  },

  // Overview Section Data
  overview: {
    budget: {
      currency: "EUR",
      totalEstimated: 3850,
      breakdown: {
        accommodation: {
          total: 1200,
          perNight: 300,
          details: [
            {
              location: "Paris",
              hotel: "Hotel Villa Florentine",
              nights: 1,
              cost: 280,
            },
            {
              location: "Lyon",
              hotel: "Hotel Villa Florentine",
              nights: 1,
              cost: 260,
            },
            {
              location: "Geneva",
              hotel: "Hotel Beau-Rivage Geneva",
              nights: 1,
              cost: 320,
            },
            {
              location: "Milan",
              hotel: "Hotel Spadari al Duomo",
              nights: 1,
              cost: 290,
            },
            {
              location: "Venice",
              hotel: "Hotel Danieli Venice",
              nights: 1,
              cost: 350,
            },
            {
              location: "Rome",
              hotel: "Hotel Artemide Rome",
              nights: 1,
              cost: 300,
            },
          ],
        },
        transportation: {
          total: 680,
          details: [
            {
              type: "Car Rental",
              description: "5 days premium car rental",
              cost: 350,
            },
            { type: "Fuel", description: "Estimated for 1,247 km", cost: 180 },
            {
              type: "Tolls",
              description: "French and Italian highways",
              cost: 120,
            },
            {
              type: "Parking",
              description: "City center parking fees",
              cost: 30,
            },
          ],
        },
        activities: {
          total: 420,
          details: [
            { location: "Paris", activity: "Seine River Cruise", cost: 35 },
            { location: "Paris", activity: "Eiffel Tower admission", cost: 29 },
            { location: "Lyon", activity: "Basilica entry", cost: 8 },
            { location: "Geneva", activity: "UN Office tour", cost: 15 },
            { location: "Milan", activity: "La Scala tour", cost: 25 },
            { location: "Venice", activity: "Gondola ride", cost: 80 },
            { location: "Venice", activity: "Doge's Palace", cost: 30 },
            { location: "Venice", activity: "Murano Island ferry", cost: 20 },
            { location: "Rome", activity: "Colosseum night tour", cost: 45 },
            {
              location: "General",
              activity: "Museum entries & misc",
              cost: 133,
            },
          ],
        },
        food: {
          total: 750,
          perDay: 150,
          details: [
            { type: "Breakfast", dailyBudget: 25, total: 125 },
            { type: "Lunch", dailyBudget: 45, total: 225 },
            { type: "Dinner", dailyBudget: 65, total: 325 },
            { type: "Snacks & Drinks", dailyBudget: 15, total: 75 },
          ],
        },
        miscellaneous: {
          total: 200,
          details: [
            { type: "Shopping & Souvenirs", cost: 120 },
            { type: "Emergency Fund", cost: 50 },
            { type: "Tips & Gratuities", cost: 30 },
          ],
        },
      },
      budgetTips: [
        {
          category: "Accommodation",
          tip: "Book hotels at least 3 weeks in advance for better rates",
          savings: "Up to 25%",
        },
        {
          category: "Food",
          tip: "Try local lunch menus (menu du jour) for authentic meals at lower prices",
          savings: "30-40% vs dinner prices",
        },
        {
          category: "Transportation",
          tip: "Use city tourism cards that include public transport and attraction discounts",
          savings: "15-20% on combined costs",
        },
      ],
    },

    flights: {
      userFlights: [
        {
          id: "flight1",
          flightNumber: "",
          airline: "",
          departure: {
            airport: "",
            date: "",
            time: "",
          },
          arrival: {
            airport: "",
            date: "",
            time: "",
          },
          status: "Not Added",
          addPrompt:
            "Add your flight details to track status and get real-time updates",
        },
      ],
      trackingFeatures: [
        "Real-time flight status updates",
        "Gate and terminal information",
        "Delay notifications",
        "Check-in reminders",
        "Baggage claim information",
      ],
    },

    checklist: {
      preTravel: [
        {
          id: "doc1",
          task: "Check passport validity (6+ months remaining)",
          completed: false,
          category: "Documents",
          importance: "Critical",
          deadline: "1 week before travel",
        },
        {
          id: "doc2",
          task: "Get International Driving Permit",
          completed: false,
          category: "Documents",
          importance: "Critical",
          deadline: "2 weeks before travel",
        },
        {
          id: "doc3",
          task: "Notify bank of travel plans",
          completed: false,
          category: "Financial",
          importance: "High",
          deadline: "1 week before travel",
        },
        {
          id: "health1",
          task: "Check travel insurance coverage",
          completed: false,
          category: "Health & Safety",
          importance: "High",
          deadline: "1 week before travel",
        },
        {
          id: "tech1",
          task: "Download offline maps for European cities",
          completed: false,
          category: "Technology",
          importance: "Medium",
          deadline: "Before departure",
        },
        {
          id: "book1",
          task: "Book Louvre Museum timed entry",
          completed: false,
          category: "Bookings",
          importance: "High",
          deadline: "1 week before travel",
        },
        {
          id: "book2",
          task: "Reserve restaurants in Venice and Milan",
          completed: false,
          category: "Bookings",
          importance: "Medium",
          deadline: "1 week before travel",
        },
      ],

      packing: [
        {
          id: "pack1",
          task: "Comfortable walking shoes",
          completed: false,
          category: "Clothing",
          importance: "Critical",
          note: "You'll walk 8-12km per day in cities",
        },
        {
          id: "pack2",
          task: "Layered clothing for varying climates",
          completed: false,
          category: "Clothing",
          importance: "High",
          note: "October weather varies from 8°C to 20°C",
        },
        {
          id: "pack3",
          task: "Portable phone charger/power bank",
          completed: false,
          category: "Electronics",
          importance: "High",
          note: "Essential for navigation and photos",
        },
        {
          id: "pack4",
          task: "European plug adapters (Type C)",
          completed: false,
          category: "Electronics",
          importance: "High",
          note: "Same plug type for all countries except Switzerland",
        },
        {
          id: "pack5",
          task: "Swiss plug adapter (Type J)",
          completed: false,
          category: "Electronics",
          importance: "Medium",
          note: "Only needed for Geneva stay",
        },
        {
          id: "pack6",
          task: "Copies of important documents",
          completed: false,
          category: "Documents",
          importance: "High",
          note: "Keep separate from originals",
        },
        {
          id: "pack7",
          task: "Small day backpack",
          completed: false,
          category: "Accessories",
          importance: "Medium",
          note: "For daily excursions and shopping",
        },
      ],

      duringTrip: [
        {
          id: "trip1",
          task: "Check into accommodations and verify checkout times",
          completed: false,
          category: "Accommodation",
          importance: "High",
          recurring: "Daily",
        },
        {
          id: "trip2",
          task: "Validate parking regulations in each city",
          completed: false,
          category: "Transportation",
          importance: "High",
          recurring: "Per city",
        },
        {
          id: "trip3",
          task: "Check weather forecast for next day",
          completed: false,
          category: "Planning",
          importance: "Medium",
          recurring: "Daily",
        },
        {
          id: "trip4",
          task: "Back up photos and important data",
          completed: false,
          category: "Technology",
          importance: "Medium",
          recurring: "Every 2 days",
        },
      ],
    },

    additionalInfo: {
      emergencyContacts: [
        {
          country: "France",
          police: "17",
          medical: "15",
          fire: "18",
          general: "112",
        },
        {
          country: "Switzerland",
          police: "117",
          medical: "144",
          fire: "118",
          general: "112",
        },
        {
          country: "Italy",
          police: "113",
          medical: "118",
          fire: "115",
          general: "112",
        },
      ],

      importantInfo: [
        {
          title: "Time Zones",
          content:
            "All destinations are in Central European Time (CET/CEST), UTC+1/+2",
          relevance: "No jet lag between locations",
        },
        {
          title: "Language",
          content:
            "French (Paris, Lyon), French/German (Geneva), Italian (Milan, Venice, Rome)",
          relevance: "English widely spoken in tourist areas",
        },
        {
          title: "Currency",
          content:
            "Euro (EUR) in France and Italy, Swiss Franc (CHF) in Switzerland",
          relevance: "Have some Swiss Francs for Geneva",
        },
        {
          title: "Tipping Culture",
          content:
            "France: 5-10%, Switzerland: Round up, Italy: 10% for good service",
          relevance: "Factor into meal budgets",
        },
        {
          title: "Business Hours",
          content:
            "Many shops close 12-2 PM for lunch, especially in France and Italy",
          relevance: "Plan shopping accordingly",
        },
      ],

      weatherForecast: [
        {
          date: "2025-10-15",
          location: "Paris",
          high: 16,
          low: 9,
          condition: "Partly Cloudy",
          precipitation: 20,
          recommendation: "Light jacket recommended",
        },
        {
          date: "2025-10-16",
          location: "Lyon",
          high: 18,
          low: 11,
          condition: "Sunny",
          precipitation: 5,
          recommendation: "Perfect weather for walking",
        },
        {
          date: "2025-10-17",
          location: "Geneva",
          high: 15,
          low: 8,
          condition: "Partly Cloudy",
          precipitation: 15,
          recommendation: "Bring layers for mountain drive",
        },
        {
          date: "2025-10-18",
          location: "Milan",
          high: 19,
          low: 12,
          condition: "Clear",
          precipitation: 0,
          recommendation: "Great day for outdoor activities",
        },
        {
          date: "2025-10-19",
          location: "Venice/Rome",
          high: 20,
          low: 14,
          condition: "Sunny",
          precipitation: 10,
          recommendation: "Ideal conditions for sightseeing",
        },
      ],
    },
  },
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

// Helper functions for Explore section
export const getNewsByLocation = (location) => {
  return (
    mockTripData.explore.news.find((item) =>
      item.location.toLowerCase().includes(location.toLowerCase())
    )?.articles || []
  );
};

export const getNewsByDate = (date) => {
  return (
    mockTripData.explore.news.find((item) => item.date === date)?.articles || []
  );
};

export const getRecommendationsByCategory = (category) => {
  return mockTripData.explore.recommendations.filter(
    (rec) => rec.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRecommendationsByLocation = (location) => {
  return mockTripData.explore.recommendations.filter((rec) =>
    rec.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getTipsByCategory = (category) => {
  return (
    mockTripData.explore.tips.find(
      (tip) => tip.category.toLowerCase() === category.toLowerCase()
    )?.tips || []
  );
};

// Helper functions for Overview section
export const getBudgetByCategory = (category) => {
  return mockTripData.overview.budget.breakdown[category] || null;
};

export const getTotalBudget = () => {
  return mockTripData.overview.budget.totalEstimated;
};

export const getChecklistByCategory = (category) => {
  const categories = {
    "pre-travel": mockTripData.overview.checklist.preTravel,
    packing: mockTripData.overview.checklist.packing,
    "during-trip": mockTripData.overview.checklist.duringTrip,
  };
  return categories[category] || [];
};

export const getEmergencyContactsByCountry = (country) => {
  return (
    mockTripData.overview.additionalInfo.emergencyContacts.find(
      (contact) => contact.country.toLowerCase() === country.toLowerCase()
    ) || null
  );
};

export const getWeatherByDate = (date) => {
  return (
    mockTripData.overview.additionalInfo.weatherForecast.find(
      (weather) => weather.date === date
    ) || null
  );
};

// Helper function to get all unique locations for filters
export const getAllUniqueLocations = () => {
  const locations = new Set();
  mockTripData.days.forEach((day) => {
    locations.add(day.startLocation.name.split(",")[0]); // Get city name only
    locations.add(day.endLocation.name.split(",")[0]);
  });
  return Array.from(locations);
};

// Helper function to get trip dates range
export const getTripDates = () => {
  return {
    startDate: mockTripData.dateRange.startDate,
    endDate: mockTripData.dateRange.endDate,
    duration: mockTripData.duration,
  };
};
