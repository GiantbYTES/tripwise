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
    const basePrompt = `You are an expert travel planner. Create a detailed ${formData.duration}-day trip itinerary for ${formData.travelers} traveler(s) to ${formData.destination}${formData.city ? ` (specifically ${formData.city})` : ''}.

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
1. Create a day-by-day itinerary that fits within the specified budget
2. Include realistic travel times and distances between locations
3. Suggest specific landmarks, attractions, and activities based on the traveler's interests
4. Provide actual hotel/accommodation recommendations
5. Include helpful notes and tips for each day
6. Make sure the trip type (${formData.tripType}) is reflected in the activities
7. Consider the number of travelers when suggesting activities and accommodations
8. Use real geographical coordinates for all locations (latitude and longitude)
9. Ensure all dates fall within the specified range: ${formData.startDate} to ${formData.endDate}

OUTPUT FORMAT REQUIREMENTS:
You MUST respond with a valid JSON object that exactly matches this structure:

{
  "tripName": "A creative name for this trip",
  "duration": "${formData.duration} Days",
  "totalDistance": "Total estimated travel distance",
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
        "address": "Specific landmark or address", 
        "coordinates": { "lat": actual_latitude, "lng": actual_longitude },
        "time": "HH:MM"
      },
      "distance": "XXX km",
      "activities": ["Activity 1", "Activity 2", "Activity 3"],
      "accommodation": "Specific hotel/accommodation name",
      "notes": "Brief summary and highlights of the day"
    }
  ]
}

IMPORTANT: 
- Respond ONLY with valid JSON
- Use real coordinates for actual places
- Make sure all dates are in YYYY-MM-DD format
- Include realistic travel distances and times
- Consider the budget when making recommendations
- Ensure activities match the selected interests: ${formData.interests.join(', ') || 'general tourism'}

Generate the complete itinerary now:`;

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