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
import { useQuery } from '@tanstack/react-query'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { useEffect } from 'react'

const GroupApprovalModal = ({ isOpen, onClose, createdBy, groupId }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [privacy, setPrivacy] = useState('public')
  const [description, setDescription] = useState('')

  const members = useQuery({
    queryKey: ['get-members'],
    queryFn: userService.getMembers,
  })

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value)
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

  console.log('Createdby: ' + createdBy)
  console.log('GroupId: ' + groupId)
  const [formData1, setFormData1] = useState({})
  const [formData2, setFormData2] = useState({})

  const mutation = useMutation({
    mutationFn: (params, data) =>
      userService.makeGroupAdmin(formData1, formData2),
    onSuccess: (data) => {
      toast.success('Education update successfully')
    },
    onError: (error) => {
      // Handle login error
      toast.error(error?.message)
    },
  })

  useEffect(() => {
    setFormData1(groupId)
    setFormData2(createdBy)
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()

    mutation.mutate(formData2)
  }

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <div className='heading'>
            <h3>List of Members</h3>
            <CgCloseR onClick={onClose} className='icon' />
          </div>
          {members?.isPending
            ? [1, 2, 3, 4, 5].map((n) => (
                <SkeletonArticle key={n} theme='light' />
              ))
            : members?.data?.members.map((item, index) => (
                <button type='submit' className='card' key={item._id}>
                  <p>{item.full_name}</p>
                  <p>{item._id}</p>
                </button>
              ))}
          {isSuccessModalOpen ? (
            <SuccessModal onClose={closeSuccessModal} />
          ) : null}
        </form>
      </Wrapper>
    </GenericModal>
  )
}

export default GroupApprovalModal
