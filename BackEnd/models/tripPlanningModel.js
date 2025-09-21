const { GoogleGenerativeAI } = require("@google/generative-ai");
const { TripValidation } = require("../../shared/tripValidation");
const { TripErrorHandler } = require("../../shared/tripErrorHandler");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

class TripPlanningModel {
  constructor() {
    console.log("🔑 Initializing TripPlanningModel...");
    console.log(`API Key available: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
    console.log(`API Key length: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0}`);
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("✅ TripPlanningModel initialized successfully");
  }

  // Create the master prompt template
  buildTripPlanPrompt(formData) {
    const basePrompt = `You are an expert travel planner. Create a comprehensive ${formData.duration}-day trip itinerary for ${formData.travelers} traveler(s) to ${formData.destination}${formData.city ? ` (specifically ${formData.city})` : ''}.

TRIP DETAILS:
- Destination: ${formData.destination}${formData.city ? ` - ${formData.city}` : ''}
- Trip Type: ${formData.tripType}
- Duration: ${formData.duration} days
- Number of Travelers: ${formData.travelers}
- Budget: $${formData.budget} USD total
- Travel Dates: ${formData.startDate} to ${formData.endDate}
- Preferred Accommodation: ${formData.accommodation || 'No specific preference'}
- Preferred Transportation: ${formData.transportation || 'Mixed transportation options'}
- Interests: ${formData.interests.length > 0 ? formData.interests.join(', ') : 'General sightseeing'}

REQUIREMENTS:
1. Create a comprehensive day-by-day itinerary with detailed locations and activities
2. Include realistic travel times, distances, and coordinates for all locations
3. Provide specific hotel recommendations and activity suggestions
4. Generate relevant local news, recommendations, and travel tips
5. Create detailed budget breakdown and practical travel information
6. Include weather forecasts, checklists, and emergency information
7. Ensure all content matches the traveler's interests and trip type
8. Make the trip realistic within the specified budget and timeframe

OUTPUT FORMAT REQUIREMENTS:
You MUST respond with a valid JSON object that exactly matches this comprehensive structure:

{
  "tripName": "A creative name for this trip",
  "duration": "${formData.duration} Days",
  "totalDistance": "Total estimated travel distance (e.g., '1,247 km')",
  "dateRange": {
    "startDate": "${formData.startDate}",
    "endDate": "${formData.endDate}"
  },
  "days": [
    {
      "id": 1,
      "date": "YYYY-MM-DD (starting from ${formData.startDate})",
      "dayNumber": 1,
      "startLocation": {
        "name": "City, Country",
        "address": "Specific landmark or address",
        "coordinates": { "lat": actual_latitude, "lng": actual_longitude },
        "time": "HH:MM"
      },
      "endLocation": {
        "name": "City, Country",
        "address": "Different landmark or address",
        "coordinates": { "lat": actual_latitude, "lng": actual_longitude },
        "time": "HH:MM"
      },
      "distance": "XXX km",
      "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
      "accommodation": "Specific hotel/accommodation name",
      "notes": "Detailed summary and highlights of the day with travel tips"
    }
  ],
  "explore": {
    "news": [
      {
        "id": 1,
        "location": "City, Country",
        "date": "YYYY-MM-DD",
        "articles": [
          {
            "title": "Relevant local news title",
            "summary": "Brief description of the news",
            "relevance": "How this affects the traveler",
            "source": "News source",
            "publishDate": "YYYY-MM-DD"
          }
        ]
      }
    ],
    "recommendations": [
      {
        "id": 1,
        "category": "Restaurants|Activities|Shopping|Cultural Sites",
        "location": "City, Country",
        "items": [
          {
            "name": "Recommendation name",
            "type": "Type of place/activity",
            "description": "Detailed description",
            "rating": 4.5,
            "priceRange": "€€€" or "price": "€15",
            "address": "Full address",
            "nearbyAttraction": "Connection to itinerary"
          }
        ]
      }
    ],
    "tips": [
      {
        "id": 1,
        "category": "Transportation|Cultural|Practical",
        "location": "General|Specific City",
        "tips": [
          {
            "title": "Tip title",
            "content": "Detailed tip content",
            "importance": "Critical|High|Medium|Low",
            "timing": "When to apply this tip"
          }
        ]
      }
    ]
  },
  "overview": {
    "budget": {
      "currency": "USD",
      "totalEstimated": ${formData.budget},
      "breakdown": {
        "accommodation": {
          "total": number,
          "perNight": number,
          "details": [
            {
              "location": "City",
              "hotel": "Hotel name",
              "nights": number,
              "cost": number
            }
          ]
        },
        "transportation": {
          "total": number,
          "details": [
            {
              "type": "Transport type",
              "description": "Description",
              "cost": number
            }
          ]
        },
        "activities": {
          "total": number,
          "details": [
            {
              "location": "City",
              "activity": "Activity name",
              "cost": number
            }
          ]
        },
        "food": {
          "total": number,
          "perDay": number,
          "details": [
            {
              "type": "Breakfast|Lunch|Dinner|Snacks",
              "dailyBudget": number,
              "total": number
            }
          ]
        },
        "miscellaneous": {
          "total": number,
          "details": [
            {
              "type": "Category",
              "cost": number
            }
          ]
        }
      }
    },
    "checklist": {
      "preTravel": [
        {
          "id": "doc1",
          "task": "Task description",
          "completed": false,
          "category": "Documents|Financial|Health & Safety|Technology|Bookings",
          "importance": "Critical|High|Medium|Low",
          "deadline": "Time frame"
        }
      ],
      "packing": [
        {
          "id": "pack1",
          "task": "Item to pack",
          "completed": false,
          "category": "Clothing|Electronics|Documents|Accessories",
          "importance": "Critical|High|Medium|Low",
          "note": "Why this item is important"
        }
      ]
    },
    "additionalInfo": {
      "emergencyContacts": [
        {
          "country": "Country name",
          "police": "phone",
          "medical": "phone",
          "fire": "phone",
          "general": "112"
        }
      ],
      "importantInfo": [
        {
          "title": "Information category",
          "content": "Detailed information",
          "relevance": "How this affects travel"
        }
      ],
      "weatherForecast": [
        {
          "date": "YYYY-MM-DD",
          "location": "City",
          "high": temperature_celsius,
          "low": temperature_celsius,
          "condition": "Weather condition",
          "precipitation": percentage,
          "recommendation": "Clothing/activity recommendation"
        }
      ]
    }
  }
}

CRITICAL REQUIREMENTS:
- Respond ONLY with valid JSON
- Use real coordinates for actual places (precise latitude/longitude)
- All dates in YYYY-MM-DD format
- Include realistic pricing in the specified budget
- Generate 2-4 news articles per major destination
- Provide 3-5 recommendations per category per major city
- Include practical tips relevant to the destinations and travel style
- Create comprehensive budget breakdown that adds up to the total
- Include pre-travel and packing checklists with at least 5-7 items each
- Add emergency contacts for each country visited
- Provide weather forecasts for each day of travel
- Ensure all activities match selected interests: ${formData.interests.join(', ') || 'general tourism'}

Generate the complete comprehensive trip plan now:`;

    return basePrompt;
  }

  // Generate trip plan using the form data
  async generateTripPlan(formData) {
    try {
      // Validate and format data using shared validation
      const validation = TripValidation.validateFormData(formData);
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ');
        throw new Error(`Validation failed: ${errorMessage}`);
      }
      
      const formattedData = TripValidation.formatFormData(formData);
      const prompt = this.buildTripPlanPrompt(formattedData);
      
      console.log('Generated prompt:', prompt.substring(0, 200) + '...');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse the JSON response
      let tripPlan;
      try {
        // Clean up the response - remove any markdown formatting
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Lama shetaase et ze
        // console.log('🔍 Raw LLM response (first 1000 chars):', cleanedText.substring(0, 1000));
        // console.log('🔍 Response length:', cleanedText.length);

        tripPlan = JSON.parse(cleanedText);
        
        // Validate the response structure using shared validation
        TripValidation.validateTripPlanResponse(tripPlan);
        
      } catch (parseError) {
        console.error('Failed to parse LLM response as JSON:', parseError);
        throw new Error('LLM response was not in valid JSON format');
      }
      
      return {
        success: true,
        data: tripPlan,
        formData: formattedData // Include formatted form data for reference
      };
      
    } catch (error) {
      console.error('Error generating trip plan:', error);
      throw error;
    }
  }

}

module.exports = TripPlanningModel;