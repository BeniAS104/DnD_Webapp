import PropTypes from 'prop-types';
import '../styles/components/DeleteConfirmationModal.css'; // Add your custom styles

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="delete-confirmation-modal">
        <p>Are you sure you want to delete this note?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onCancel} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
