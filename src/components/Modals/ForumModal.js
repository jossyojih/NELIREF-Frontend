import React from 'react'
import GenericModal from './GenericModal'
import Wrapper from '../../assets/wrappers/GroupsModal'
import { CgCloseR } from 'react-icons/cg'
import { useState } from 'react'
import SuccessModal from './SuccessModal'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import userService from '../../services/api/user'

const ForumModal = ({ isOpen, onClose }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const openSuccessModal = (e) => {
    e.preventDefault()
    setIsSuccessModalOpen(true)
  }
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
    onClose()
  }

  const mutation = useMutation({
    mutationFn: userService.addForum,
    onSuccess: (data) => {
      setIsSuccessModalOpen(true)
    },
    onError: (error) => {
      toast.error('Error')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      toast.error('Title is required')
      return
    }

    if (!description) {
      toast.error('Description is required')
      return
    }
    // If there are no validation errors, submit the form
    mutation.mutate({
      name: title,
      description,
    })
    setTitle('')
    setDescription('')
  }
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <div className='heading'>
          <h3>Create a Forum</h3>
          <CgCloseR onClick={onClose} className='icon' />
        </div>

        <form>
          <p className='note'>
            Fill in details of the forum you want to create, also indicate if
            you wan it private or public. Approval for the forum should take a
            maximum of 72 hours
          </p>
          <div>
            <label>Title of Forum</label>
            <input
              type='text'
              placeholder='Enter title here'
              value={title}
              onChange={handleTitleChange}
            />
            <p className='error'></p>
          </div>
          <div>
            <label>Description (What will the forum be about)</label>
            <textarea
              type='text'
              placeholder='Enter title here'
              value={description}
              onChange={handleDescriptionChange}
            />
            <p>0/2000</p>
            <p className='error'></p>
          </div>
          <div className='btn'>
            <button onClick={handleSubmit}>
              {' '}
              {mutation.isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20}
                />
              ) : (
                <>Create Forum</>
              )}
            </button>
          </div>
        </form>
        {isSuccessModalOpen ? (
          <SuccessModal onClose={closeSuccessModal} />
        ) : null}
      </Wrapper>
    </GenericModal>
  )
}

export default ForumModal
