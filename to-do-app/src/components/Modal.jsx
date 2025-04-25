import { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Initialize Bootstrap modal
      modalInstance.current = new BootstrapModal(modalRef.current);
      modalInstance.current.show();

      // Add event listener for when modal is hidden
      const handleHidden = () => {
        onClose();
      };

      modalRef.current.addEventListener('hidden.bs.modal', handleHidden);

      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
          modalInstance.current?.hide();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="modal fade" 
      tabIndex="-1" 
      aria-labelledby="taskModalLabel" 
      aria-hidden="true"
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