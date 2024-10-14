import React, { useState } from 'react'
import { MdOutlineCheckBox } from 'react-icons/md'
import userService from '../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import forumImg from '../../assets/images/group-img.png'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { Link, useNavigate } from 'react-router-dom'
import EditForumPhoto from '../Modals/EditForumPhoto'
import EditForumModal from '../Modals/EditForumModal'

// Function to detect and format only links (URLs)
const formatDescription = (description) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  return description.split('\n').map((line, index) =>
    line.split(urlRegex).map((part, i) =>
      urlRegex.test(part) ? (
        <React.Fragment key={i}>
          <br />
          <a
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#2a4d93' }}
          >
            {part}
          </a>
          <br />
        </React.Fragment>
      ) : (
        part
      )
    )
  )
}

const MyForums = () => {
  const navigate = useNavigate()
  const [visibleForums, setVisibleForums] = useState(4) // Number of initially visible forums
  const [isEditForumModalOpen, setIsEditForumModalOpen] = useState(false)
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false)
  const [editForumData, setEditForumData] = useState({ id: null, item: null })
  const [editForumPhoto, setEditForumPhoto] = useState(null)

  // New state to track description expansion
  const [expandedForum, setExpandedForum] = useState(null)

  const openIsEditPhotoModal = (id) => {
    setEditForumPhoto(id)
    setIsEditPhotoModalOpen(true)
  }

  const closeIsEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false)
  }

  const openEditForumModal = (id, item) => {
    setEditForumData({ id, item }) // Set the id and item to state
    setIsEditForumModalOpen(true)
  }

  const closeEditForumModal = () => {
    setIsEditForumModalOpen(false)
  }

  const handleLoadMore = () => {
    setVisibleForums((prevVisibleForums) => prevVisibleForums + 4) // Increase by 4 for each load more click
  }

  const forums = useQuery({
    queryKey: ['get-forum'],
    queryFn: userService.getForums,
  })

  const toggleDescription = (index) => {
    setExpandedForum((prev) => (prev === index ? null : index)) // Toggle between expanded and collapsed state
  }

  const descriptionThreshold = 100

  return (
    <article className='forums'>
      {forums.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <article className='all-groups'>
          <section>
            {forums?.data?.slice(0, visibleForums).map(
              (
                item,
                index // Only map through visible forums
              ) => (
                <div className='content forum' key={index}>
                  <div style={{ width: '250px' }} className='img'>
                    <img src={item.photo} alt={`group-img-${index}`} />
                  </div>
                  <div style={{ width: '70%' }}>
                    <h5
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        navigate(`/forum/${index}`, { state: { item } })
                      }
                    >
                      {item.name}
                    </h5>
                    <p style={{ textAlign: 'justify' }}>
                      {expandedForum === index ||
                      item.description.length <= descriptionThreshold
                        ? formatDescription(item.description)
                        : formatDescription(
                            `${item.description.slice(
                              0,
                              descriptionThreshold
                            )}...`
                          )}
                    </p>
                    {item.description.length > descriptionThreshold && (
                      <p
                        style={{ color: '#2a4d93', cursor: 'pointer' }}
                        className='see-more-btn'
                        onClick={() => toggleDescription(index)}
                      >
                        {expandedForum === index ? 'See Less' : 'See More'}
                      </p>
                    )}
                    <div className='edit-btns'>
                      <button
                        className='member'
                        onClick={() => openEditForumModal(item?._id, item)}
                      >
                        Edit Forum
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
              )
            )}
            {visibleForums < forums?.data?.length && ( // Show load more button if there are more forums to display
              <button
                style={{
                  width: '15%',
                  margin: '.5rem auto',
                  justifyContent: 'center',
                }}
                className='member'
                onClick={handleLoadMore}
              >
                Load more
              </button>
            )}
          </section>
        </article>
      )}
      {forums.isError && <p>An Error Occurred</p>}
      <EditForumModal
        isOpen={isEditForumModalOpen}
        id={editForumData?.id} // Pass the id from state
        onClose={closeEditForumModal}
        item={editForumData?.item} // Pass the item from state
      />

      {isEditPhotoModalOpen && (
        <EditForumPhoto
          onClose={closeIsEditPhotoModal}
          id={editForumPhoto} // Pass the id from state
        />
      )}
    </article>
  )
}

export default MyForums
