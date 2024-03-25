import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'

const ConfirmDailogBox = ({ onClose, handleSubmit }) => {
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
  }
  return (
    <Wrapper style={modalStyle}>
      <div style={contentStyle}>
        <p>Are sure you want to make this member admin? </p>
        <div className='d-flex'>
          <button onClick={handleSubmit}>Yes</button>
          <button className='red' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default ConfirmDailogBox
