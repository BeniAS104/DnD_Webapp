import { useState, useEffect } from 'react';
import FindPalsModal from '../components/findPalsModal';

const FindPals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsModalVisible(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1>Find Your D&D Pals!</h1>
      {isModalVisible && <FindPalsModal onClose={handleCloseModal} />}
      {/* The rest of your page content */}
    </div>
  );
};

export default FindPals;
