import React, { useState } from 'react'
import { MdOutlineCheckBox, MdOutlinePersonAddAlt1 } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avatar from '../../assets/images/profile.png'
import moment from 'moment'
import { useSelector } from 'react-redux'
import userService from '../../services/api/user'
import ConfirmationModal from '../Modals/ConfirmationModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const MemberCard = ({ member, isMe }) => {
  const { connections } = useSelector((store) => store.user)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [activeMember, setActiveMember] = useState(null)
  const queryClient = useQueryClient()
  console.log(member)

  const openConfirmModal = () => {
    setConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
  }

  function connectionStatus(memberId) {
    if (!connections.some((item) => item.user === memberId)) {
      return false
    } else if (connections.some((item) => item.user === memberId)) {
      return true
    }
  }

  function connectionRequest(member) {
    setActiveMember(member?._id)
    setMessage(`Send connection request to ${member?.full_name}?`)
    openConfirmModal()
    setActiveMember(member?._id)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => userService.sendConnectionRequest(activeMember),
    onSuccess: (data) => {
      // Handle successful login
      toast.success(data.message)
      setActiveMember(null)
      queryClient.invalidateQueries(['connections'])
      closeConfirmModal()
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error)

      toast.error(error)
      toast.error(error?.message)
    },
  })

  return (
    <section className='members'>
      <div className='content members'>
        <div className='img'>
          <img src={avatar} alt='group-img' />
        </div>
        <div>
          {isMe ? (
            <Link to={`/profile`}>
              <h6>
                {member?.full_name} <span>{isMe ? 'Me' : 'Member'}</span>
              </h6>
            </Link>
          ) : (
            <Link to={`/user-profile/${member?._id}`}>
              <h6>
                {member?.full_name} <span>{isMe ? 'Me' : 'Member'}</span>
              </h6>
            </Link>
          )}

          <p>
            Joined{' '}
            {new Date(member?.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
            {' - '}
            Active{' '}
            {isMe ? 'Now' : `last ${moment(member?.updatedAt).fromNow()}`}
          </p>
        </div>
      </div>
      <div className='member-icons'>
        {!connectionStatus(member?._id) && !isMe && (
          <MdOutlinePersonAddAlt1
            onClick={() => connectionRequest(member)}
            style={{ cursor: 'pointer' }}
            className='icon'
          />
        )}

        <BsThreeDotsVertical className='icon' />
      </div>
      {confirmModalOpen && (
        <ConfirmationModal
          onClose={closeConfirmModal}
          action={mutate}
          isLoading={isPending}
          message={message}
        />
      )}
    </section>
  )
}

export default MemberCard
