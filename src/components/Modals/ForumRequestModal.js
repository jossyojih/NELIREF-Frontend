import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { MdOutlineCheckBox } from 'react-icons/md'
import { CgCloseR } from 'react-icons/cg'
import { IoMdClose } from 'react-icons/io'

const ForumRequestModal = ({ onClose, message }) => {
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
    marginTop: '5%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
  }
  return (
    <Wrapper style={modalStyle}>
      <div className='content-style'>
        <div className='heading'>
          <h3>Forum Request</h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className='modal-content'>
          <h5>Singles and Married Counseling </h5>
          <p>
            Privacy <span className='span-bold'> Public</span> | Author:{' '}
            <span className='span-bold'>Joseph Tsenum</span>
          </p>
          <p>
            <span className='span-bold'>Description: </span>A group made to have
            an interfacing between single and married people A group made to
            have an interfacing between single and married people A group made
            to have an interfacing between single and married people
          </p>
        </div>
        <div className='cta-flex'>
          <button className='member'>
            <MdOutlineCheckBox className='icon' />
            Approve
          </button>
          <button className='member red'>
            <CgCloseR className='icon' />
            Decline
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default ForumRequestModal
