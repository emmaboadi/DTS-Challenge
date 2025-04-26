import { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Initialize Bootstrap modal
      modalInstance.current = new BootstrapModal(modalRef.current, {
        backdrop: 'static', // Prevent closing by clicking backdrop
        keyboard: false,    // Prevent closing with Esc
        focus: true,
      });
      modalInstance.current.show();

      // Add event listener for when modal is hidden
      const handleHidden = () => {
        onClose();
      };

      modalRef.current.addEventListener('hidden.bs.modal', handleHidden);

      return () => {
        // Remove event listener and hide modal
        if (modalRef.current) {
          modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
        }
        // Hide the modal if it's still open
        if (modalInstance.current) {
          modalInstance.current.hide();
        }
        // Remove any leftover Bootstrap backdrops
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style = '';
      };
    }
    // If modal is not open, ensure cleanup
    if (!isOpen) {
      document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="modal fade show" // Add 'show' to ensure modal is visible
      tabIndex="-1" 
      aria-labelledby="taskModalLabel" 
      aria-modal="true"
      role="dialog"
      style={{ display: 'block' }} // Ensure modal is displayed
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskModalLabel">Task Form</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} 
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 