import { useState, useEffect } from "react";
import "./FlightStatus.css";
import { tripData } from "../../../utils/tripData";
import FlightService from "../../../services/flightService";

export default function FlightStatus() {
  // Check if flight data exists, provide fallback if not
  const flightsData = tripData?.overview?.flights;
  const defaultFlightData = {
    id: "flight1",
    flightNumber: "",
    airline: "",
    departure: { airport: "", date: "", time: "" },
    arrival: { airport: "", date: "", time: "" },
    status: "Not Added",
    addPrompt:
      "Add your flight details to track status and get real-time updates",
  };

  // Default tracking features if not available from trip data
  const defaultTrackingFeatures = [
    "Real-time flight status updates",
    "Gate and terminal information",
    "Delay notifications",
    "Check-in reminders",
    "Baggage claim information",
  ];

  const [flightData, setFlightData] = useState(
    flightsData?.userFlights?.[0] || defaultFlightData
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [liveFlightData, setLiveFlightData] = useState(null);
  const [isMockData, setIsMockData] = useState(false);
  const [formData, setFormData] = useState({
    flightNumber: "",
    flightDate: "",
  });

  const trackingFeatures =
    flightsData?.trackingFeatures || defaultTrackingFeatures;

  // Fetch live flight data from API
  const fetchFlightData = async (flightNumber, date = null) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const result = await FlightService.getFormattedFlightStatus(
        flightNumber,
        date
      );

      if (result.success && result.data) {
        setLiveFlightData(result.data);
        setIsMockData(result.isMockData || false);
        return result.data;
      } else {
        setApiError(result.error || "No flight data found");
        return null;
      }
    } catch (error) {
      setApiError("Failed to fetch flight data");
      console.error("Flight data fetch error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch flight data when component mounts if flight number exists
  useEffect(() => {
    if (
      flightData.flightNumber &&
      flightData.flightNumber !== "Not Added" &&
      flightData.status === "Tracking Active"
    ) {
      const departureDate = FlightService.formatDateForAPI(
        flightData.departure?.date
      );
      fetchFlightData(flightData.flightNumber, departureDate);
    }
  }, [flightData.flightNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Fetch live flight data from API
    const departureDate = FlightService.formatDateForAPI(formData.flightDate);
    const liveData = await fetchFlightData(
      formData.flightNumber,
      departureDate
    );

    if (liveData) {
      // Create flight data from API response
      const updatedFlight = {
        flightNumber: formData.flightNumber,
        airline: liveData.airline?.name || "Unknown Airline",
        departure: {
          airport: liveData.departure?.iata || "Unknown",
          date: formData.flightDate || new Date().toISOString().split("T")[0],
          time: liveData.departure?.scheduled
            ? FlightService.formatTime(liveData.departure.scheduled)
            : "TBD",
          terminal: liveData.departure?.terminal,
          gate: liveData.departure?.gate,
          actualTime: liveData.departure?.actual
            ? FlightService.formatTime(liveData.departure.actual)
            : null,
          estimatedTime: liveData.departure?.estimated
            ? FlightService.formatTime(liveData.departure.estimated)
            : null,
          delay: liveData.departure?.delay,
        },
        arrival: {
          airport: liveData.arrival?.iata || "Unknown",
          date: formData.flightDate || new Date().toISOString().split("T")[0],
          time: liveData.arrival?.scheduled
            ? FlightService.formatTime(liveData.arrival.scheduled)
            : "TBD",
          terminal: liveData.arrival?.terminal,
          gate: liveData.arrival?.gate,
          actualTime: liveData.arrival?.actual
            ? FlightService.formatTime(liveData.arrival.actual)
            : null,
          estimatedTime: liveData.arrival?.estimated
            ? FlightService.formatTime(liveData.arrival.estimated)
            : null,
          delay: liveData.arrival?.delay,
        },
        status: "Tracking Active",
        realTimeStatus: liveData.status,
        aircraft: liveData.aircraft,
      };
      setFlightData(updatedFlight);
    } else {
      // Fallback if API fails - create basic flight entry
      const basicFlight = {
        flightNumber: formData.flightNumber,
        airline: "Unknown Airline",
        departure: {
          airport: "Unknown",
          date: formData.flightDate || new Date().toISOString().split("T")[0],
          time: "TBD",
        },
        arrival: {
          airport: "Unknown",
          date: formData.flightDate || new Date().toISOString().split("T")[0],
          time: "TBD",
        },
        status: "Manual Entry",
      };
      setFlightData(basicFlight);
    }

    setIsEditing(false);
  };

  const handleEdit = () => {
    setFormData({
      flightNumber: flightData.flightNumber || "",
      flightDate: flightData.departure?.date || "",
    });
    setIsEditing(true);
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not set";
    return new Date(`${date}T${time}`).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flight-status-container">
      <div className="flight-header">
        <h3>Flight Status Tracking</h3>
        <p className="text-muted">
          Add your flight details to get real-time updates
        </p>
      </div>

      {!isEditing && flightData.status === "Not Added" ? (
        <div className="no-flight-card">
          <div className="no-flight-content">
            <i className="fas fa-plane-departure"></i>
            <h4>No Flight Added</h4>
            <p>{flightData.addPrompt}</p>
            <button className="btn-add-flight" onClick={handleEdit}>
              <i className="fas fa-plus"></i>
              Add Flight Details
            </button>
          </div>
        </div>
      ) : !isEditing ? (
        <div className="flight-card">
          <div className="flight-card-header">
            <div className="flight-number">
              <h4>
                {flightData.airline} {flightData.flightNumber}
              </h4>
              <span
                className={`status-badge ${
                  flightData.status === "Tracking Active" ? "active" : "pending"
                }`}
              >
                <i className="fas fa-circle"></i>
                {liveFlightData?.status || flightData.status}
              </span>
            </div>
            <div className="flight-actions">
              <button
                className="btn-refresh"
                onClick={() => {
                  const departureDate = FlightService.formatDateForAPI(
                    flightData.departure?.date
                  );
                  fetchFlightData(flightData.flightNumber, departureDate);
                }}
                disabled={isLoading}
                title="Refresh flight data"
              >
                <span
                  className={isLoading ? "spinning" : ""}
                  style={{ fontSize: "1.6em" }}
                >
                  ⟳
                </span>
              </button>
              <button className="btn-edit" onClick={handleEdit}>
                <i className="fas fa-edit"></i>
                Edit
              </button>
            </div>
          </div>

          {apiError && !isMockData && (
            <div className="api-error">
              <i className="fas fa-exclamation-triangle"></i>
              <span>Live data unavailable: {apiError}</span>
            </div>
          )}

          {isMockData && (
            <div className="mock-data-notice">
              <i className="fas fa-info-circle"></i>
              <span>
                Demo Mode: Showing sample flight data (API blocked by CORS
                policy)
              </span>
            </div>
          )}

          <div className="flight-route">
            <div className="departure">
              <div className="airport-code">
                {flightData.departure?.airport}
              </div>
              <div className="datetime">
                {formatDateTime(
                  flightData.departure?.date,
                  flightData.departure?.time
                )}
              </div>
              {liveFlightData?.departure?.estimatedTime && (
                <div className="live-time">
                  Est: {liveFlightData.departure.estimatedTime}
                </div>
              )}
              {liveFlightData?.departure?.actualTime && (
                <div className="actual-time">
                  Actual: {liveFlightData.departure.actualTime}
                </div>
              )}
              {liveFlightData?.departure?.terminal && (
                <div className="terminal-gate">
                  Terminal {liveFlightData.departure.terminal}
                  {liveFlightData.departure.gate &&
                    ` - Gate ${liveFlightData.departure.gate}`}
                </div>
              )}
              <div className="label">Departure</div>
            </div>

            <div className="flight-arrow">
              <i className="fas fa-plane"></i>
              <div className="route-line"></div>
            </div>

            <div className="arrival">
              <div className="airport-code">{flightData.arrival?.airport}</div>
              <div className="datetime">
                {formatDateTime(
                  flightData.arrival?.date,
                  flightData.arrival?.time
                )}
              </div>
              {liveFlightData?.arrival?.estimatedTime && (
                <div className="live-time">
                  Est: {liveFlightData.arrival.estimatedTime}
                </div>
              )}
              {liveFlightData?.arrival?.actualTime && (
                <div className="actual-time">
                  Actual: {liveFlightData.arrival.actualTime}
                </div>
              )}
              {liveFlightData?.arrival?.terminal && (
                <div className="terminal-gate">
                  Terminal {liveFlightData.arrival.terminal}
                  {liveFlightData.arrival.gate &&
                    ` - Gate ${liveFlightData.arrival.gate}`}
                </div>
              )}
              <div className="label">Arrival</div>
            </div>
          </div>

          {flightData.status === "Tracking Active" && (
            <div className="flight-updates">
              <div className="update-item">
                <i className="fas fa-info-circle"></i>
                <span>Real-time tracking enabled</span>
              </div>
              <div className="update-item">
                <i className="fas fa-bell"></i>
                <span>Notifications active</span>
              </div>
              {liveFlightData && (
                <div
                  className={`update-item ${
                    isMockData ? "mock-data" : "live-data"
                  }`}
                >
                  <i
                    className={`fas ${
                      isMockData ? "fa-flask" : "fa-satellite"
                    }`}
                  ></i>
                  <span>
                    {isMockData ? "Demo data" : "Live data"}:{" "}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              )}
              {liveFlightData?.aircraft?.registration && (
                <div className="update-item">
                  <i className="fas fa-plane"></i>
                  <span>Aircraft: {liveFlightData.aircraft.registration}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flight-form-card">
          <form onSubmit={handleSubmit} className="flight-form">
            <div className="form-header">
              <h4>Add Flight for Tracking</h4>
              <p className="form-description">
                Enter your flight number and we'll automatically fetch all the
                details and provide real-time tracking.
              </p>
            </div>

            <div className="simple-form-section">
              <div className="form-group">
                <label htmlFor="flightNumber">Flight Number</label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., AA123, DL456, UA789"
                  required
                  className="flight-number-input"
                />
                <small className="help-text">
                  Enter the airline code and flight number (e.g., AA123 for
                  American Airlines flight 123)
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="flightDate">Flight Date (Optional)</label>
                <input
                  type="date"
                  id="flightDate"
                  name="flightDate"
                  value={formData.flightDate}
                  onChange={handleInputChange}
                  className="flight-date-input"
                />
                <small className="help-text">
                  Leave empty for today's flight or enter specific date
                </small>
              </div>
            </div>

            {isLoading && (
              <div className="loading-indicator">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Fetching flight information...</span>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save" disabled={isLoading}>
                <i className="fas fa-search"></i>
                {isLoading ? "Searching..." : "Track Flight"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tracking-features">
        <h4>
          <i className="fas fa-star"></i> Tracking Features
        </h4>
        <div className="features-grid">
          {trackingFeatures.map((feature, index) => (
            <div key={index} className="feature-item">
              <i className="fas fa-check"></i>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
