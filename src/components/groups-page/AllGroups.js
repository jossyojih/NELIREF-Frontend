import { MdOutlineCheckBox } from 'react-icons/md'
import { useEffect, useState } from 'react'
import GroupApprovalModal from '../Modals/GroupApprovalModal'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import groupImg from '../../../src/assets/images/group-img.png'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import userService from '../../services/api/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from '../Modals/ConfirmationModal'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import EditGroup from '../Modals/EditGroup'
import EditGroupPhoto from '../Modals/EditGroupPhoto'

const AllGroups = ({ groups, isError, isPending }) => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.user)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [message, setMessage] = useState('')
  const [visibleGroups, setVisibleGroups] = useState(3) // Number of initially visible groups
  const [allGroups, setAllGroups] = useState('')
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false)
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false)
  const [editGroupData, setEditGroupData] = useState({ id: null, item: null })
  const [editGroupPhoto, setEditGroupPhoto] = useState(null)

  const [showMore, setShowMore] = useState(
    Array(groups?.length).fill(false) // Initialize state to track whether full text is shown for each group
  )

  const openIsEditPhotoModal = (id) => {
    setEditGroupPhoto(id)
    setIsEditPhotoModalOpen(true)
  }

  const closeIsEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false)
  }

  const openEditGroupModal = (id, item) => {
    setEditGroupData({ id, item }) // Set the id and item to state
    setIsEditGroupModalOpen(true)
  }

  const closeEditGroupModal = () => {
    setIsEditGroupModalOpen(false)
  }

  const openConfirmModal = () => {
    setConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const joinGroup = (groupId) => {
    setSelectedGroup(groupId)
    setMessage('Are you sure you want to join this group?')
    openConfirmModal()
  }

  const mutation = useMutation({
    mutationFn: userService.joinGroup,
    onSuccess: (data) => {
      toast.success(data.message)
      setSelectedGroup(null)
      queryClient.invalidateQueries(['get-groups'])
      closeConfirmModal()
    },
    onError: (error) => {
      console.error('Join group error:', error)
      toast.error(error?.message || 'Error joining group')
    },
  })

  useEffect(() => {
    setAllGroups(groups)
  }, [groups])

  const handleLoadMore = () => {
    setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 3) // Increase by 3 for each load more click
  }

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return `${text.substring(0, limit)}...`
    }
    return text
  }

  const toggleShowMore = (index) => {
    const updatedShowMore = [...showMore]
    updatedShowMore[index] = !updatedShowMore[index] // Toggle between show more/less
    setShowMore(updatedShowMore)
  }

  return (
    <article className='all-groups'>
      {isPending &&
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)}
      <section className='flex-column'>
        <>
          {groups?.slice(0, visibleGroups).map(
            (
              item,
              index // Only map through visible groups
            ) => (
              <section key={index}>
                {isModalOpen && (
                  <GroupApprovalModal
                    createdBy={item?.createdBy}
                    groupId={item?._id}
                    isOpen={openModal}
                    onClose={closeModal}
                  />
                )}

                <div className='content' key={index}>
                  <div style={{ width: '420px' }}>
                    <img
                      style={{
                        width: '100%',
                        display: 'block',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                      src={item.photo ? item.photo : groupImg}
                      alt={`group-img-${index}`}
                    />
                  </div>
                  <div>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        navigate(`/group/${index}`, { state: { item } })
                      }
                    >
                      <h5>{item.name}</h5>
                    </p>

                    <p>
                      {item?.privacy === 'public'
                        ? 'All'
                        : item.members?.length}{' '}
                      Members
                    </p>
                    <p>
                      {showMore[index]
                        ? item.description
                        : truncateText(item.description, 100)}
                      {item?.description?.length > 100 && (
                        <span
                          style={{
                            color: '#2a4d93',
                            fontWeight: '500',
                            cursor: 'pointer',
                          }}
                          onClick={() => toggleShowMore(index)}
                        >
                          {showMore[index] ? ' Show less' : ' Show more'}
                        </span>
                      )}
                    </p>
                    <div className='edit-btns'>
                      <button
                        className='member'
                        onClick={() => openEditGroupModal(item?._id, item)}
                      >
                        Edit Group
                      </button>
                      <button
                        className='member'
                        onClick={() => openIsEditPhotoModal(item?._id)}
                      >
                        Edit Photo
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  {item?.privacy === 'public' ||
                  item?.members?.some(
                    (member) =>
                      member?.user?._id === user._id &&
                      member.status === 'approved'
                  ) ? (
                    <button className='member'>
                      <MdOutlineCheckBox className='icon' />
                      Member
                    </button>
                  ) : item?.members?.some(
                      (member) =>
                        member.user?._id === user?._id &&
                        member?.status === 'pending'
                    ) ? (
                    <button className='member'>
                      <MdOutlineCheckBox className='icon' />
                      Request Sent
                    </button>
                  ) : (
                    <button
                      className='member'
                      onClick={() => joinGroup(item?._id)}
                    >
                      <MdOutlineCheckBox className='icon' />
                      Join group
                    </button>
                  )}

                  {(user?.userType === 'admin' ||
                    user?.userType === 'super-admin') && (
                    <button className='member green' onClick={openModal}>
                      Make Admin
                    </button>
                  )}
                </div>
              </section>
            )
          )}
        </>
        {visibleGroups < groups?.length && ( // Show load more button if there are more groups to display
          <button className='member loadmore' onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </section>
      {isError && <p>An Error Occurred</p>}
      {confirmModalOpen && (
        <ConfirmationModal
          onClose={closeConfirmModal}
          action={() => mutation.mutate(selectedGroup)}
          isLoading={mutation?.isPending}
          message={message}
        />
      )}

      <EditGroup
        isOpen={isEditGroupModalOpen}
        id={editGroupData?.id} // Pass the id from state
        onClose={closeEditGroupModal}
        item={editGroupData?.item} // Pass the item from state
      />

      {isEditPhotoModalOpen && (
        <EditGroupPhoto
          onClose={closeIsEditPhotoModal}
          id={editGroupPhoto?.id}
        />
      )}
    </article>
  )
}

export default AllGroups
