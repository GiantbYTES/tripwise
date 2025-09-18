// Test script to verify trip planning functionality
// Run this with: node BackEnd/test/testTripPlanning.js

const TripPlanningModel = require('../models/tripPlanningModel');

async function testTripPlanning() {
  console.log('🧪 Testing Trip Planning Model...\n');
  
  // Sample form data
  const sampleFormData = {
    destination: 'France',
    city: 'Paris',
    tripType: 'Cultural & Historical',
    travelers: 2,
    budget: 1500,
    startDate: '2025-10-15',
    endDate: '2025-10-17',
    accommodation: 'Hotel',
    transportation: 'Flight',
    interests: ['Museums & Art', 'Local Cuisine', 'Historical Sites']
  };

  console.log('📝 Sample Form Data:');
  console.log(JSON.stringify(sampleFormData, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    const tripPlanningModel = new TripPlanningModel();
    
    console.log('🚀 Generating trip plan...\n');
    const result = await tripPlanningModel.generateTripPlan(sampleFormData);
    
    console.log('✅ Trip Plan Generated Successfully!');
    console.log('\n📋 Result:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error generating trip plan:', error.message);
    
    if (error.message.includes('API')) {
      console.log('\n💡 Make sure your GEMINI_API_KEY is set in the .env file');
    }
  }
}

// Run the test
if (require.main === module) {
  testTripPlanning();
}

module.exports = testTripPlanning;