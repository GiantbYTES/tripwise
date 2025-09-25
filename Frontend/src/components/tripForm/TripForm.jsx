import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import {
  COUNTRIES,
  CITIES_BY_COUNTRY,
  TRIP_TYPES,
  TRAVELER_OPTIONS,
  ACCOMMODATION_TYPES,
  TRANSPORTATION_TYPES,
  INTEREST_OPTIONS,
} from "./tripFormConstants";
import tripPlanningAPI from "../../services/tripPlanningAPI";
import "./TripForm.css";

function TripForm({ onClose, isModal = false }) {
  const [formData, setFormData] = useState({
    destination: "",
    destinationCity: "",
    returnDestination: "",
    returnCity: "",
    tripType: "",
    travelers: "",
    budget: "",
    startDate: "",
    endDate: "",
    interests: [],
    accommodation: "",
    transportation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get cities for selected countries
  const getDestinationCities = () => {
    return formData.destination ? (CITIES_BY_COUNTRY[formData.destination] || []) : [];
  };

  const getReturnCities = () => {
    return formData.returnDestination ? (CITIES_BY_COUNTRY[formData.returnDestination] || []) : [];
  };

  // Calculate trip duration for display (includes both start and end days)
  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      // Add 1 to include both start and end days
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      return duration > 0 ? duration : 0;
    }
    return 0;
  };

  const tripDuration = calculateDuration();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      
      // If destination changes, clear destination city and update return destination
      if (name === 'destination') {
        newData.destinationCity = '';
        // If return destination is empty or same as old destination, automatically update it
        if (!prev.returnDestination || prev.returnDestination === prev.destination) {
          newData.returnDestination = value;
          newData.returnCity = '';
        }
      }
      
      // If return destination changes, clear return city
      if (name === 'returnDestination') {
        newData.returnCity = '';
      }
      
      return newData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Only destination country is required - everything else is optional
    if (!formData.destination.trim())
      newErrors.destination = "Destination country is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("🚀 Submitting trip plan...");

      // Submit to backend API (validation and formatting happens in API service)
      const result = await tripPlanningAPI.submitTripPlan(formData);

      if (result.success) {
        console.log("✅ Trip plan generated successfully:", result.data);

        // Store the trip plan data
        localStorage.setItem("generatedTripPlan", JSON.stringify(result.data));
        localStorage.setItem("originalFormData", JSON.stringify(formData));

        // Show success message
        alert(
          `Trip plan "${result.data.tripName}" generated successfully! Check console for full details.`
        );

        // Close modal if in modal mode
        if (isModal && onClose) {
          onClose();
        }

        // TODO: Navigate to trip results page
        // navigate('/trip-results');
      } else {
        throw new Error(result.error || "Failed to generate trip plan");
      }
    } catch (error) {
      console.error("❌ Error submitting trip plan:", error);

      // Simple error handling - detailed handling is in shared modules
      const errorMessage =
        error.message || "Failed to generate trip plan. Please try again.";
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form content that can be used in modal or standalone
  const formContent = (
    <div className={`${isModal ? "form-container" : ""}`}>
      {errors.submit && (
        <Alert variant="danger" className="mb-4">
          {errors.submit}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Basic Trip Information */}
        {isModal && (
          <div className="section-title">
            <i className="fas fa-map-marked-alt me-2"></i>
            Basic Trip Information
          </div>
        )}

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Destination Country *</Form.Label>
              <Form.Select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                isInvalid={!!errors.destination}
              >
                <option value="">Select a country...</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.destination}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Return Country</Form.Label>
              <Form.Select
                name="returnDestination"
                value={formData.returnDestination}
                onChange={handleInputChange}
                isInvalid={!!errors.returnDestination}
                disabled={!formData.destination}
              >
                <option value="">
                  {!formData.destination 
                    ? "Select destination country first..." 
                    : "Select return country..."
                  }
                </option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.returnDestination}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                <small>Defaults to destination country for round trips</small>
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Trip Type</Form.Label>
              <Form.Select
                name="tripType"
                value={formData.tripType}
                onChange={handleInputChange}
                isInvalid={!!errors.tripType}
              >
                <option value="">Select trip type...</option>
                {TRIP_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.tripType}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* City Selection Row */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Destination City</Form.Label>
              <Form.Select
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleInputChange}
                isInvalid={!!errors.destinationCity}
                disabled={!formData.destination}
              >
                <option value="">
                  {!formData.destination 
                    ? "Select a country first..." 
                    : "Select a city (optional)..."
                  }
                </option>
                {getDestinationCities().map((city, index) => (
                  <option key={`dest-${index}`} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.destinationCity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Return City</Form.Label>
              <Form.Select
                name="returnCity"
                value={formData.returnCity}
                onChange={handleInputChange}
                isInvalid={!!errors.returnCity}
                disabled={!formData.returnDestination}
              >
                <option value="">
                  {!formData.returnDestination 
                    ? "Select return country first..." 
                    : "Select a city (optional)..."
                  }
                </option>
                {getReturnCities().map((city, index) => (
                  <option key={`return-${index}`} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.returnCity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Trip Details Section */}
        {isModal && (
          <div className="section-title">
            <i className="fas fa-users me-2"></i>
            Trip Details & Budget
          </div>
        )}

        {/* Travelers */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Number of Travelers</Form.Label>
              <Form.Select
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                isInvalid={!!errors.travelers}
              >
                <option value="">Select number of travelers...</option>
                {TRAVELER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.travelers}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Budget and Dates */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Budget (USD)</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                isInvalid={!!errors.budget}
                placeholder="e.g., 2000"
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.budget}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                isInvalid={!!errors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.startDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate}
              </Form.Control.Feedback>
              {tripDuration > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    🗓️ Trip Duration:{" "}
                    <strong>
                      {tripDuration} day{tripDuration !== 1 ? "s" : ""}
                    </strong>
                  </small>
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Preferences Section */}
        {isModal && (
          <div className="section-title">
            <i className="fas fa-bed me-2"></i>
            Travel Preferences
          </div>
        )}

        {/* Accommodation and Transportation */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">
                Preferred Accommodation
              </Form.Label>
              <Form.Select
                name="accommodation"
                value={formData.accommodation}
                onChange={handleInputChange}
              >
                <option value="">Select accommodation type...</option>
                {ACCOMMODATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">
                Preferred Transportation
              </Form.Label>
              <Form.Select
                name="transportation"
                value={formData.transportation}
                onChange={handleInputChange}
              >
                <option value="">Select transportation...</option>
                {TRANSPORTATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Interests Section */}
        {isModal && (
          <div className="section-title">
            <i className="fas fa-heart me-2"></i>
            Interests & Activities
          </div>
        )}

        {/* Interests */}
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold mb-3">
                Interests & Activities
              </Form.Label>
              <div className="interests-grid">
                {INTEREST_OPTIONS.map((interest) => (
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
            className="px-5 py-3 submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating Your Trip Plan...
              </>
            ) : (
              "Create My Trip Plan"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );

  // Return different layouts based on mode
  if (isModal) {
    return formContent;
  }

  // Standalone page layout
  return (
    <Container className="trip-form-container py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">Plan Your Perfect Trip</h2>
              <p className="mb-0 mt-2">
                Tell us about your dream destination and we'll create a
                personalized itinerary
              </p>
            </Card.Header>
            <Card.Body className="p-4">{formContent}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TripForm;
