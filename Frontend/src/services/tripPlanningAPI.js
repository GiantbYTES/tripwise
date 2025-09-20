// API service for trip planning requests
import { TripValidation } from '../../../shared/tripValidation.js';
import { TripErrorHandler } from '../../../shared/tripErrorHandler.js';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:3000/api';

class TripPlanningAPI {
  
  async submitTripPlan(formData) {
    try {
      console.log('🚀 Submitting trip plan to backend:', formData);
      
      // Validate using shared validation
      const validation = TripValidation.validateFormData(formData);
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ');
        throw new Error(`Validation failed: ${errorMessage}`);
      }
      
      // Format using shared formatting
      const formattedData = TripValidation.formatFormData(formData);
      
      const response = await fetch(`${API_BASE_URL}/gemini/plan-trip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Trip plan generated successfully:', result);
      
      return result;
      
    } catch (error) {
      console.error('❌ Error submitting trip plan:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const tripPlanningAPI = new TripPlanningAPI();
export default tripPlanningAPI;