import React from 'react'
import { MdOutlineCheckBox } from 'react-icons/md'
import { CgCloseR } from 'react-icons/cg'
import { useState } from 'react'
import ForumRequestModal from '../Modals/ForumRequestModal'

const ForumRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const data = [
    {
      title: 'Singles and Married Counseling',
      privacy: 'Public',
      author: 'Joseph Tsenum',
      description: 'A group made to have an interfacing between single...',
    },
    // Add more objects as needed
  ]
  return (
    <article className='all-groups'>
      {isModalOpen && <ForumRequestModal onClose={closeModal} />}
      <section>
        {data.map((item, index) => (
          <div className='content' key={index}>
            <div>
              <h5>{item.title}</h5>
              <p>
                Privacy <span className='span-bold'>{item.privacy}</span> |
                Author: <span className='span-bold'>{item.author}</span>
              </p>
              <p>
                <span className='span-bold'>Description: </span>
                {item.description}{' '}
                <span className='see-more' onClick={() => openModal(item)}>
                  See more
                </span>
              </p>
            </div>
          </div>
        ))}
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
      </section>
    </article>
  )
}

export default ForumRequest
