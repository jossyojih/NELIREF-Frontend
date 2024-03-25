import React from 'react'
import GenericModal from './GenericModal'
import Wrapper from '../../assets/wrappers/GroupsModal'
import { CgCloseR } from 'react-icons/cg'
import { useState } from 'react'
import SuccessModal from './SuccessModal'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import profile from '../../assets/images/profile.png'
import userService from '../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'

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
    mutationFn: ({ params, data }) => userService.makeGroupAdmin(params, data),
    onSuccess: (data) => {
      toast.success('Education update successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  useEffect(() => {
    setFormData1(groupId)
    setFormData2(createdBy)
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      params: formData1,
      data: { userId: formData2 },
    })
  }
  console.log(members)

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <form>
          <div className='heading'>
            <h3>List of Members</h3>
            <CgCloseR onClick={onClose} className='icon' />
          </div>
          {members?.isPending
            ? [1, 2, 3, 4, 5].map((n) => (
                <SkeletonArticle key={n} theme='light' />
              ))
            : members?.data?.members.map((item, index) => (
                <div type='submit' className='card' key={item._id}>
                  <div className='inner-flex'>
                    <img className='img-profile' src={profile} alt='' />
                    <div>
                      <h4>{item.full_name}</h4>
                      <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>

                  <div onClick={handleSubmit}>
                    <FaPlus />
                  </div>
                </div>
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
