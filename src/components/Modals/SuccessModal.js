import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'

const SuccessModal = ({ onClose, message }) => {
  const modalStyle = {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }

  const contentStyle = {
    backgroundColor: 'white',
    width: '30%',
    margin: 'auto',
    marginTop: '15%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
    zIndex: 1222,
  }
  return (
    <Wrapper style={modalStyle}>
      <div style={contentStyle}>
        <h3>Succes!</h3>
        <p>{message}</p>

        <button onClick={onClose}>Continue</button>
      </div>
    </Wrapper>
  )
}

export default SuccessModal
