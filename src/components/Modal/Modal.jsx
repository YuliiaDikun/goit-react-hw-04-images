import PropTypes from 'prop-types';

import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onImageClick, largeImgUrl, setIsModalOpen, nodeRef }) => {
  useEffect(() => {  
    const handleKeyDown = e => {           
      if (e.key === 'Escape') {
        onImageClick('');
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onImageClick, setIsModalOpen]);
  
  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onImageClick('');
      setIsModalOpen(false);
    }
  };  
  return (
    <div className={css.Overlay} onClick={handleBackdrop} ref={nodeRef}>
      <div className={css.Modal}>
        <img src={largeImgUrl} alt="" />        
      </div>
    </div>
  );
}


Modal.propTypes = {
  onImageClick: PropTypes.func,
};