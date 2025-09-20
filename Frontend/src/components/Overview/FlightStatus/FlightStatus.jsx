import { useState } from "react";
import "./FlightStatus.css";
import { mockTripData } from "../../../utils/tripData";

export default function FlightStatus() {
  const [flightData, setFlightData] = useState(
    mockTripData.overview.flights.userFlights[0]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    departureAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalAirport: "",
    arrivalDate: "",
    arrivalTime: "",
  });

  const trackingFeatures = mockTripData.overview.flights.trackingFeatures;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFlight = {
      ...flightData,
      flightNumber: formData.flightNumber,
      airline: formData.airline,
      departure: {
        airport: formData.departureAirport,
        date: formData.departureDate,
        time: formData.departureTime,
      },
      arrival: {
        airport: formData.arrivalAirport,
        date: formData.arrivalDate,
        time: formData.arrivalTime,
      },
      status: "Tracking Active",
    };
    setFlightData(updatedFlight);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setFormData({
      flightNumber: flightData.flightNumber || "",
      airline: flightData.airline || "",
      departureAirport: flightData.departure?.airport || "",
      departureDate: flightData.departure?.date || "",
      departureTime: flightData.departure?.time || "",
      arrivalAirport: flightData.arrival?.airport || "",
      arrivalDate: flightData.arrival?.date || "",
      arrivalTime: flightData.arrival?.time || "",
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
                {flightData.status}
              </span>
            </div>
            <button className="btn-edit" onClick={handleEdit}>
              <i className="fas fa-edit"></i>
              Edit
            </button>
          </div>

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
            </div>
          )}
        </div>
      ) : (
        <div className="flight-form-card">
          <form onSubmit={handleSubmit} className="flight-form">
            <div className="form-header">
              <h4>Flight Information</h4>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="airline">Airline</label>
                <input
                  type="text"
                  id="airline"
                  name="airline"
                  value={formData.airline}
                  onChange={handleInputChange}
                  placeholder="e.g., American Airlines"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="flightNumber">Flight Number</label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., AA123"
                  required
                />
              </div>
            </div>

            <div className="departure-section">
              <h5>
                <i className="fas fa-plane-departure"></i> Departure
              </h5>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="departureAirport">Airport Code</label>
                  <input
                    type="text"
                    id="departureAirport"
                    name="departureAirport"
                    value={formData.departureAirport}
                    onChange={handleInputChange}
                    placeholder="e.g., JFK"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departureDate">Date</label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departureTime">Time</label>
                  <input
                    type="time"
                    id="departureTime"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="arrival-section">
              <h5>
                <i className="fas fa-plane-arrival"></i> Arrival
              </h5>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="arrivalAirport">Airport Code</label>
                  <input
                    type="text"
                    id="arrivalAirport"
                    name="arrivalAirport"
                    value={formData.arrivalAirport}
                    onChange={handleInputChange}
                    placeholder="e.g., CDG"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="arrivalDate">Date</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="arrivalTime">Time</label>
                  <input
                    type="time"
                    id="arrivalTime"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                <i className="fas fa-save"></i>
                Save Flight Details
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
