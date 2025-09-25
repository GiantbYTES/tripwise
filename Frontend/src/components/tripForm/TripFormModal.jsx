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
    </Modal>
  );
}

export default TripFormModal;
