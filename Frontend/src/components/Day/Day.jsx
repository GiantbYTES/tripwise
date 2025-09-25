import "./Day.css";
import { mockTripData } from "../../utils/tripData";

export default function Day({ selectedDay, onDaySelect }) {
  // Use the selectedDay from props, fallback to first day if not provided
  const currentSelectedDay = selectedDay || mockTripData.days[0];

  const handleDaySelect = (day) => {
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="compact-trip-header">
        <h1 className="trip-title">{mockTripData.tripName}</h1>
        <span className="trip-details">
          {mockTripData.duration} • {mockTripData.totalDistance}
        </span>
      </div>

      {/* Selected Day Details */}
      <div className="row">
        <div className="col-md-12">
          <div className="card day-details-card">
            <div className="card-header">
              <h4>
                Day {currentSelectedDay.dayNumber} -{" "}
                {new Date(currentSelectedDay.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Route Information */}
                <div className="col-md-6">
                  <h5>Route</h5>
                  <div className="location-card start-location">
                    <div className="location-header">
                      <span className="location-badge start">START</span>
                      <span className="time">
                        {currentSelectedDay.startLocation.time}
                      </span>
                    </div>
                    <h6>{currentSelectedDay.startLocation.name}</h6>
                    <p className="text-muted">
                      {currentSelectedDay.startLocation.address}
                    </p>
                    {/* <small className="coordinates">
                      📍 {currentSelectedDay.startLocation.coordinates.lat},{" "}
                      {currentSelectedDay.startLocation.coordinates.lng}
                    </small> */}
                  </div>

                  {/* <div className="route-line">
                    <div className="distance-badge">
                      🚗 {currentSelectedDay.distance}
                    </div>
                  </div> */}

                  <div className="location-card end-location">
                    <div className="location-header">
                      <span className="location-badge end">END</span>
                      <span className="time">
                        {currentSelectedDay.endLocation.time}
                      </span>
                    </div>
                    <h6>{currentSelectedDay.endLocation.name}</h6>
                    <p className="text-muted">
                      {currentSelectedDay.endLocation.address}
                    </p>
                    {/* <small className="coordinates">
                      📍 {currentSelectedDay.endLocation.coordinates.lat},{" "}
                      {currentSelectedDay.endLocation.coordinates.lng}
                    </small> */}
                  </div>
                </div>

                {/* Day Details */}
                <div className="col-md-6">
                  <h5>Activities</h5>
                  <ul className="activities-list">
                    {currentSelectedDay.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>

                  <h5 className="mt-4">Accommodation</h5>
                  <p className="accommodation">
                    🏨 {currentSelectedDay.accommodation}
                  </p>

                  <h5 className="mt-4">Notes</h5>
                  <p className="notes">{currentSelectedDay.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Summary Table */}
      <div className="mt-4">
        <h3>Trip Summary</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Route</th>
                <th>Distance</th>
                <th>Accommodation</th>
              </tr>
            </thead>
            <tbody>
              {mockTripData.days.map((day) => (
                <tr
                  key={day.id}
                  className={
                    currentSelectedDay.id === day.id ? "table-active" : ""
                  }
                >
                  <td>Day {day.dayNumber}</td>
                  <td>{new Date(day.date).toLocaleDateString()}</td>
                  <td>
                    {day.startLocation.name.split(",")[0]} →{" "}
                    {day.endLocation.name.split(",")[0]}
                  </td>
                  <td>{day.distance}</td>
                  <td>{day.accommodation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
