import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { 
  COUNTRIES, 
  TRIP_TYPES, 
  TRAVELER_OPTIONS, 
  ACCOMMODATION_TYPES, 
  TRANSPORTATION_TYPES, 
  INTEREST_OPTIONS 
} from './tripFormConstants';
import './tripForm.css';

function TripForm() {
  const [formData, setFormData] = useState({
    destination: '',
    tripType: '',
    travelers: '',
    duration: '',
    budget: '',
    startDate: '',
    endDate: '',
    interests: [],
    accommodation: '',
    transportation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.tripType) {
      newErrors.tripType = 'Trip type is required';
    }

    if (!formData.travelers) {
      newErrors.travelers = 'Number of travelers is required';
    }

    if (!formData.duration) {
      newErrors.duration = 'Trip duration is required';
    } else if (parseInt(formData.duration) < 1 || parseInt(formData.duration) > 365) {
      newErrors.duration = 'Duration must be between 1 and 365 days';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (parseInt(formData.budget) < 0) {
      newErrors.budget = 'Budget must be a positive number';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (new Date(formData.startDate) < new Date()) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your backend/AI service
      console.log('Trip planning data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success handling - redirect to results or show success message
      alert('Trip plan submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting trip plan:', error);
      setErrors({ submit: 'Failed to submit trip plan. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="trip-form-container py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">Plan Your Perfect Trip</h2>
              <p className="mb-0 mt-2">Tell us about your dream destination and we'll create a personalized itinerary</p>
            </Card.Header>
            <Card.Body className="p-4">
              {errors.submit && (
                <Alert variant="danger" className="mb-4">
                  {errors.submit}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Destination and Trip Type */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Destination Country *</Form.Label>
                      <Form.Select
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        isInvalid={!!errors.destination}
                        size="lg"
                      >
                        <option value="">Select a country...</option>
                        {COUNTRIES.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.destination}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Trip Type *</Form.Label>
                      <Form.Select
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleInputChange}
                        isInvalid={!!errors.tripType}
                        size="lg"
                      >
                        <option value="">Select trip type...</option>
                        {TRIP_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.tripType}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Travelers and Duration */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Number of Travelers *</Form.Label>
                      <Form.Select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleInputChange}
                        isInvalid={!!errors.travelers}
                        size="lg"
                      >
                        <option value="">Select number of travelers...</option>
                        {TRAVELER_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.travelers}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Duration (days) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        isInvalid={!!errors.duration}
                        placeholder="e.g., 7"
                        min="1"
                        max="365"
                        size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.duration}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Budget and Dates */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Budget (USD) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        isInvalid={!!errors.budget}
                        placeholder="e.g., 2000"
                        min="0"
                        size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.budget}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Start Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        isInvalid={!!errors.startDate}
                        size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">End Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        isInvalid={!!errors.endDate}
                        size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Accommodation and Transportation */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Preferred Accommodation</Form.Label>
                      <Form.Select
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleInputChange}
                        size="lg"
                      >
                        <option value="">Select accommodation type...</option>
                        {ACCOMMODATION_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Preferred Transportation</Form.Label>
                      <Form.Select
                        name="transportation"
                        value={formData.transportation}
                        onChange={handleInputChange}
                        size="lg"
                      >
                        <option value="">Select transportation...</option>
                        {TRANSPORTATION_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Interests */}
                <Row className="mb-4">
                  <Col>
                    <Form.Group>
                      <Form.Label className="fw-bold mb-3">Interests & Activities</Form.Label>
                      <div className="interests-grid">
                        {INTEREST_OPTIONS.map(interest => (
                          <Form.Check
                            key={interest}
                            type="checkbox"
                            id={`interest-${interest}`}
                            label={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="interest-checkbox"
                          />
                        ))}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-5 py-3 submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Your Trip Plan...
                      </>
                    ) : (
                      'Create My Trip Plan'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TripForm;