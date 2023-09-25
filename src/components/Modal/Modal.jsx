import { Overlay } from 'components/Overlay/Overlay.styled';
import { useEffect } from 'react';

export const Modal = ({ src, alt, closeModal }) => {
  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handlePressEscape = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handlePressEscape);

    return () => {
      document.removeEventListener('keydown', handlePressEscape);
    };
  }, [closeModal]);

  return (
    <Overlay onClick={handleClick}>
      <img src={src} alt={alt} width="50%" />
    </Overlay>
  );
};
