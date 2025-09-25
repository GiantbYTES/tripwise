import { Modal } from "react-bootstrap";
import TripForm from "./TripForm";
import "./TripFormModal.css";

function TripFormModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      className="trip-form-modal"
    >
      <Modal.Header closeButton className="border-0 trip-form-header">
        <Modal.Title className="w-100">
          <div className="header-content">
            <div className="d-flex align-items-baseline gap-3">
              <h2 className="mb-0">AI TripWising</h2>
              <p className="mb-0">
                Tell us about your dream destination and we'll create a
                personalized itinerary
              </p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <TripForm onClose={onHide} isModal={true} />
      </Modal.Body>
      <Modal.Footer className="border-0 trip-form-footer">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="footer-text">
            <small className="text-muted">
              <i className="fas fa-magic me-1"></i>
              Powered by AI • Create your perfect trip plan
            </small>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary close-footer-btn"
            onClick={onHide}
          >
            <i className="fas fa-times me-2"></i>
            Cancel
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default TripFormModal;
