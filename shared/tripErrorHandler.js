/**
 * Centralized error handling for trip planning
 */

export class TripErrorHandler {
  
  static handleAPIError(error) {
    console.error('Trip planning error:', error);
    
    // Categorize errors and provide user-friendly messages
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      return {
        type: 'CONNECTION_ERROR',
        message: 'Unable to connect to server. Please check your internet connection and try again.',
        technical: error.message
      };
    }
    
    if (error.message.includes('JSON') || error.message.includes('parse')) {
      return {
        type: 'DATA_ERROR',
        message: 'Received invalid response from AI. Please try again.',
        technical: error.message
      };
    }
    
    if (error.message.includes('API') || error.message.includes('GEMINI')) {
      return {
        type: 'AI_ERROR',
        message: 'AI service is currently unavailable. Please try again later.',
        technical: error.message
      };
    }
    
    if (error.message.includes('Missing required field')) {
      return {
        type: 'VALIDATION_ERROR',
        message: error.message,
        technical: error.message
      };
    }
    
    // Generic error
    return {
      type: 'UNKNOWN_ERROR',
      message: 'Something went wrong. Please try again.',
      technical: error.message
    };
  }
  
  static createErrorResponse(error, statusCode = 500) {
    const handledError = this.handleAPIError(error);
    
    return {
      success: false,
      error: handledError.message,
      type: handledError.type,
      details: process.env.NODE_ENV === 'development' ? handledError.technical : undefined
    };
  }
}

// For CommonJS environments (Node.js backend)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TripErrorHandler };
}