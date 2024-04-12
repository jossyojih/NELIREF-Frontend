import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoIosClose } from 'react-icons/io'

import email from '../../assets/images/email.png'

import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const EmailConfirmationModal = ({ onClose, action, isLoading }) => {
  const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
    textAlign: 'center',
  }

  const buttonContainerStyle = {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  }

  const buttonStyle = {
    padding: '10px', // Added to make buttons same size
    cursor: 'pointer',
    minWidth: '100px',
  }

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'red',
    color: 'white',
  }

  return (
    <Wrapper style={modalStyle}>
      <div className='content-style'>
        <h3>Reset Password</h3>
        <p className='p-color'>
          We have sent you a link via mail, please follow to reset your passowrd
        </p>
        <div>
          <img src={email} alt='' />
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={action} disabled={isLoading}>
            {isLoading ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#FFF' }}
                height={20}
                width={20}
              />
            ) : (
              <Link className='new-pword'>Continue</Link>
            )}
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default EmailConfirmationModal
