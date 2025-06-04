import React from 'react';
import ReactDOM from 'react-dom';
// Ensure we have access to createPortal
import { createPortal } from 'react-dom';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1000,
};

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  padding: '20px',
  zIndex: 1001,
  width: '90%',
  maxWidth: '600px',
  maxHeight: '85vh',
  overflowY: 'auto',
};

const CLOSE_BUTTON_STYLES = {
  position: 'absolute',
  top: '15px',
  right: '20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  lineHeight: '1',
};

export default function Model({ children, onClose }) {
  const portalElement = document.getElementById('cart-root');
  
  if (!portalElement) {
    console.error("Cart root element not found!");
    return null;
  }
  
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button style={CLOSE_BUTTON_STYLES} onClick={onClose}>×</button>
        {children}
      </div>
    </>,
    portalElement
  );
}
