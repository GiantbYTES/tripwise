const TripPlanningModel = require("../models/tripPlanningModel");
const { TripErrorHandler } = require("../../shared/tripErrorHandler");

const tripPlanningModel = new TripPlanningModel();

// New trip planning endpoint
const generateTripPlan = async (req, res) => {
  console.log("🎯 Trip plan request received");
  
  try {
    const formData = req.body;
    
    console.log('📝 Processing trip planning request for:', {
      destination: formData.destination,
      tripType: formData.tripType,
      duration: formData.duration,
      travelers: formData.travelers
    });
    
    // Generate trip plan using the model (validation happens inside)
    const result = await tripPlanningModel.generateTripPlan(formData);
    
    console.log('✅ Trip plan generated successfully');
    res.json(result);
    
  } catch (error) {
    console.error('❌ Error in generateTripPlan controller:', error.message);
    
    // Use centralized error handling
    const errorResponse = TripErrorHandler.createErrorResponse(error);
    
    // Set appropriate status code based on error type
    const statusCode = error.message.includes('Validation failed') ? 400 : 500;
    
    res.status(statusCode).json(errorResponse);
  }
};

module.exports = {
  generateTripPlan,
};
