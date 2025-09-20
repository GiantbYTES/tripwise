// Utility functions for managing trip data storage and retrieval

export class TripDataManager {
  
  // Save generated trip plan to localStorage
  static saveTripPlan(tripPlan, originalFormData = null) {
    try {
      localStorage.setItem('generatedTripPlan', JSON.stringify(tripPlan));
      if (originalFormData) {
        localStorage.setItem('originalFormData', JSON.stringify(originalFormData));
      }
      localStorage.setItem('tripPlanTimestamp', new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error saving trip plan:', error);
      return false;
    }
  }

  // Retrieve saved trip plan from localStorage
  static getSavedTripPlan() {
    try {
      const tripPlan = localStorage.getItem('generatedTripPlan');
      const formData = localStorage.getItem('originalFormData');
      const timestamp = localStorage.getItem('tripPlanTimestamp');
      
      if (!tripPlan) return null;
      
      return {
        tripPlan: JSON.parse(tripPlan),
        originalFormData: formData ? JSON.parse(formData) : null,
        timestamp: timestamp ? new Date(timestamp) : null
      };
    } catch (error) {
      console.error('Error retrieving trip plan:', error);
      return null;
    }
  }

  // Clear saved trip data
  static clearSavedTripData() {
    try {
      localStorage.removeItem('generatedTripPlan');
      localStorage.removeItem('originalFormData');
      localStorage.removeItem('tripPlanTimestamp');
      return true;
    } catch (error) {
      console.error('Error clearing trip data:', error);
      return false;
    }
  }

  // Check if there's a saved trip plan
  static hasSavedTripPlan() {
    return localStorage.getItem('generatedTripPlan') !== null;
  }

  // Save form data as draft (while user is filling the form)
  static saveDraftFormData(formData) {
    try {
      localStorage.setItem('draftTripForm', JSON.stringify(formData));
      localStorage.setItem('draftTimestamp', new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      return false;
    }
  }

  // Retrieve draft form data
  static getDraftFormData() {
    try {
      const draft = localStorage.getItem('draftTripForm');
      const timestamp = localStorage.getItem('draftTimestamp');
      
      if (!draft) return null;
      
      // Check if draft is less than 24 hours old
      if (timestamp) {
        const draftDate = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now - draftDate) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          // Draft is too old, clear it
          this.clearDraftFormData();
          return null;
        }
      }
      
      return JSON.parse(draft);
    } catch (error) {
      console.error('Error retrieving draft:', error);
      return null;
    }
  }

  // Clear draft form data
  static clearDraftFormData() {
    try {
      localStorage.removeItem('draftTripForm');
      localStorage.removeItem('draftTimestamp');
      return true;
    } catch (error) {
      console.error('Error clearing draft:', error);
      return false;
    }
  }

  // Export trip plan data as JSON file
  static exportTripPlan(tripPlan, filename = null) {
    try {
      const dataStr = JSON.stringify(tripPlan, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = filename || `trip-plan-${tripPlan.tripName?.replace(/\s+/g, '-') || 'export'}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting trip plan:', error);
      return false;
    }
  }

  // Validate trip plan structure
  static validateTripPlanStructure(tripPlan) {
    const requiredFields = ['tripName', 'duration', 'totalDistance', 'days'];
    const dayRequiredFields = ['id', 'date', 'dayNumber', 'startLocation', 'endLocation', 'distance', 'activities', 'accommodation', 'notes'];
    
    try {
      // Check top-level fields
      for (const field of requiredFields) {
        if (!tripPlan.hasOwnProperty(field)) {
          return { valid: false, error: `Missing required field: ${field}` };
        }
      }
      
      // Check days array
      if (!Array.isArray(tripPlan.days) || tripPlan.days.length === 0) {
        return { valid: false, error: 'Days must be a non-empty array' };
      }
      
      // Check each day structure
      for (let i = 0; i < tripPlan.days.length; i++) {
        const day = tripPlan.days[i];
        for (const field of dayRequiredFields) {
          if (!day.hasOwnProperty(field)) {
            return { valid: false, error: `Day ${i + 1} missing required field: ${field}` };
          }
        }
      }
      
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

export default TripDataManager;