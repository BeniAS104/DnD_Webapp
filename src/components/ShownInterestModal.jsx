import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/ShownInterestModal.css';

const FindPalsModal = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true); // Trigger exit animation
    setTimeout(() => {
      onClose(); // Unmount component after animation
    }, 300); // 300ms matches the animation duration
  };

  return (
    <div className={`modal-backdrop ${isExiting ? 'exit' : ''}`}>
      <div className="fp-modal">
        <p className='fp-modal-firstpara'>Here you can discover players and groups.</p>
        <p>
          Click <span style={{ color: 'var(--success)' }}>JOIN</span> to connect or <span style={{ color: 'var(--ruby-red)' }}>PASS</span> to explore other options.
        </p>
        <button onClick={handleClose}>Got it</button>
      </div>
    </div>
  );
};

FindPalsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FindPalsModal;
