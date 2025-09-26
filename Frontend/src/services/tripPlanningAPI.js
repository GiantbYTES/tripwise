// API service for trip planning requests
import { TripValidation } from '../../../shared/tripValidation.js';
import { TripErrorHandler } from '../../../shared/tripErrorHandler.js';
import {API_BASE_URL} from "../utils/config.js"
import { apiFetch } from '../utils/apiFetch.js';

class TripPlanningAPI {
  
  async submitTripPlan(formData) {
    try {
      console.log('Submitting trip plan to backend from tripPlanningAPI:', formData);
      
      // Validate using shared validation
      const validation = TripValidation.validateFormData(formData);

      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ');
        throw new Error(`Validation failed: ${errorMessage}`);
      }
      
      // Format using shared formatting
      const formattedData = TripValidation.formatFormData(formData);
      const response = await apiFetch(`/api/gemini/plan-trip`, {
        method: 'POST',
        body: JSON.stringify(formattedData)
      });

  
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