import PropTypes from 'prop-types';

import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onImageClick, largeImgUrl }) => {
  useEffect(() => {  
    const handleKeyDown = e => {           
      if (e.key === 'Escape') {
        onImageClick('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onImageClick]);
  
  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onImageClick('');
    }
  };  
  return (
    <div className={css.Overlay} onClick={handleBackdrop}>
      <div className={css.Modal}>
        <img src={largeImgUrl} alt="" />
      </div>
    </div>
  );
}


Modal.propTypes = {
  onImageClick: PropTypes.func,
};