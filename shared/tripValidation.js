/**
 * Shared trip planning validation logic
 * Used by both frontend and backend to ensure consistency
 */

export const REQUIRED_FIELDS = [
  'destination', 
  'tripType', 
  'travelers', 
  'budget', 
  'startDate', 
  'endDate'
];

export class TripValidation {
  
  static validateFormData(formData) {
    const errors = {};

    // Required field validations
    REQUIRED_FIELDS.forEach(field => {
      const value = formData[field];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[field] = `${field} is required`;
      }
    });

    // Duration validation (calculated from dates)
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      
      if (duration < 1) {
        errors.endDate = 'End date must be after start date';
      } else if (duration > 365) {
        errors.endDate = 'Trip duration cannot exceed 365 days';
      }
    }

    // Budget validation
    if (formData.budget) {
      const budget = parseInt(formData.budget);
      if (isNaN(budget) || budget < 0) {
        errors.budget = 'Budget must be a positive number';
      }
    }

    // Date validations
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
      
      if (startDate < today) {
        errors.startDate = 'Start date cannot be in the past';
      }
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate <= startDate) {
        errors.endDate = 'End date must be after start date';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static formatFormData(rawFormData) {
    // Calculate duration from dates
    let duration = 0;
    if (rawFormData.startDate && rawFormData.endDate) {
      const startDate = new Date(rawFormData.startDate);
      const endDate = new Date(rawFormData.endDate);
      duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }

    return {
      destination: rawFormData.destination?.trim() || '',
      city: rawFormData.city?.trim() || '',
      tripType: rawFormData.tripType || '',
      travelers: parseInt(rawFormData.travelers) || 0,
      duration: duration, // Calculated automatically
      budget: parseInt(rawFormData.budget) || 0,
      startDate: rawFormData.startDate || '',
      endDate: rawFormData.endDate || '',
      accommodation: rawFormData.accommodation || '',
      transportation: rawFormData.transportation || '',
      interests: Array.isArray(rawFormData.interests) ? rawFormData.interests : []
    };
  }

  static validateTripPlanResponse(tripPlan) {
    const requiredFields = ['tripName', 'duration', 'totalDistance', 'days'];
    const dayRequiredFields = ['id', 'date', 'dayNumber', 'startLocation', 'endLocation', 'distance', 'activities', 'accommodation', 'notes'];
    const locationRequiredFields = ['name', 'address', 'coordinates', 'time'];
    
    // Check top-level fields
    for (const field of requiredFields) {
      if (!tripPlan.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Check days array
    if (!Array.isArray(tripPlan.days) || tripPlan.days.length === 0) {
      throw new Error('Days must be a non-empty array');
    }
    
    // Check each day structure
    tripPlan.days.forEach((day, index) => {
      for (const field of dayRequiredFields) {
        if (!day.hasOwnProperty(field)) {
          throw new Error(`Day ${index + 1} missing required field: ${field}`);
        }
      }
      
      // Check location structures
      for (const location of [day.startLocation, day.endLocation]) {
        for (const field of locationRequiredFields) {
          if (!location.hasOwnProperty(field)) {
            throw new Error(`Location missing required field: ${field}`);
          }
        }
        
        // Check coordinates
        if (!location.coordinates.hasOwnProperty('lat') || !location.coordinates.hasOwnProperty('lng')) {
          throw new Error('Location coordinates must have lat and lng properties');
        }
      }
    });
    
    return true;
  }
}

// For CommonJS environments (Node.js backend)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TripValidation, REQUIRED_FIELDS };
}