import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Group'
import profileBg from '../../assets/images/profile-bg.png'
import profile from '../../assets/images/profile.png'
import { useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import GroupFeeds from '../../components/group-page/GroupFeeds'
import GroupEvents from '../../components/group-page/GroupEvents'
import GroupMembers from '../../components/group-page/GroupMembers'
import GroupFiles from '../../components/group-page/GroupFiles'
import { CiEdit } from 'react-icons/ci'
import AddGroupEventModal from '../../components/Modals/AddGroupEventModal'
import CreatePollModal from '../../components/Modals/CreatePollModal'
import MakePostModal from '../../components/Modals/MakePostModal'
import AddGroupDocumentModal from '../../components/Modals/AddGroupDocumentModal'
import UpdateGroupPhotoModal from '../../components/Modals/UpdateGroupPhotoModal'

const SingleGroup = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('feeds')
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false)
  const [isCreatePollModalOpen, setIsCreatePollModalOpen] = useState(false)
  const [isMakePostModalOpen, setIsMakePostModalOpen] = useState(false)
  const [isAddGroupDocumentModalOpen, setIsAddGroupDocumentModalOpen] =
    useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const item = location.state?.item
  const groupId = item?._id

  const MAX_LENGTH = 100 // Set a limit for the description

  const openAddEventModal = () => setIsAddEventModalOpen(true)
  const openAddPhotoModal = () => setIsAddPhotoModalOpen(true)
  const openCreatePollModal = () => setIsCreatePollModalOpen(true)
  const openMakePostModal = () => setIsMakePostModalOpen(true)
  const openAddGroupDocumentModal = () => setIsAddGroupDocumentModalOpen(true)

  const closeAddEventModal = () => setIsAddEventModalOpen(false)
  const closeAddPhotoModal = () => setIsAddPhotoModalOpen(false)
  const closeCreatePollModal = () => setIsCreatePollModalOpen(false)
  const closeMakePostModal = () => setIsMakePostModalOpen(false)
  const closeAddGroupDocumentModal = () => setIsAddGroupDocumentModalOpen(false)

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState)
  }

  return (
    <Wrapper>
      {isAddPhotoModalOpen && (
        <UpdateGroupPhotoModal groupId={groupId} onClose={closeAddPhotoModal} />
      )}
      {isAddEventModalOpen && (
        <AddGroupEventModal onClose={closeAddEventModal} id={groupId} />
      )}
      {isCreatePollModalOpen && (
        <CreatePollModal onClose={closeCreatePollModal} />
      )}
      {isMakePostModalOpen && (
        <MakePostModal onClose={closeMakePostModal} id={groupId} />
      )}
      {isAddGroupDocumentModalOpen && (
        <AddGroupDocumentModal
          onClose={closeAddGroupDocumentModal}
          id={groupId}
        />
      )}

      <article>
        <div className='bg-img-container'>
          <img src={profileBg} alt='' />
        </div>
        <section className='profile-summary'>
          <div className='profile-image'>
            <img
              src={item?.photo ? item?.photo : profile}
              alt=''
              className='img'
            />
            <span onClick={openAddPhotoModal} className='edit-photo'>
              <CiEdit className='icon-edit' />
            </span>
          </div>
          <div>
            <h3 className='profile-name'>{item?.name}</h3>
            <p>
              {item?.privacy === 'public' ? (
                <span> All Members</span>
              ) : (
                <span>{item?.members?.length} Members</span>
              )}
              <span> | {} Online</span>
            </p>
          </div>
        </section>
        <div className='tabs-wrapper'>
          <div className='tabs'>
            <h3
              onClick={() => setActiveTab('feeds')}
              className={`tab-btn ${activeTab === 'feeds' ? 'active' : ''}`}
            >
              Feeds
            </h3>
            <h3
              onClick={() => setActiveTab('events')}
              className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            >
              Events
            </h3>
            <h3
              onClick={() => setActiveTab('files')}
              className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
            >
              Files
            </h3>
            <h3
              onClick={() => setActiveTab('members')}
              className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
            >
              {item?.privacy !== 'public' && (
                <p>
                  Members{' '}
                  <span className='member-no'>{item?.members?.length}</span>
                </p>
              )}
            </h3>
          </div>
        </div>
      </article>

      <article className='tab-container'>
        <section>
          <div className='modals-btn'>
            <button onClick={openMakePostModal}>Make a post</button>
            <button onClick={openAddEventModal}>Create an Event</button>
            <button onClick={openCreatePollModal}>Create a Poll</button>
            <button onClick={openAddGroupDocumentModal}>Upload a File</button>
          </div>
          {activeTab === 'feeds' && <GroupFeeds id={groupId} />}
          {activeTab === 'events' && <GroupEvents id={groupId} />}
          {activeTab === 'members' && (
            <GroupMembers members={item?.members} id={groupId} />
          )}
          {activeTab === 'files' && <GroupFiles id={groupId} />}
        </section>
        <section className='aside'>
          <div className='description'>
            <h4>DESCRIPTION</h4>
            <p>
              {showFullDescription
                ? item?.description
                : `${item?.description?.slice(0, MAX_LENGTH)}...`}
              {item?.description?.length > MAX_LENGTH && (
                <p
                  style={{
                    cursor: 'pointer',
                    color: '#2a4d93',
                    fontWeight: '500',
                  }}
                  onClick={toggleDescription}
                >
                  {showFullDescription ? 'Show Less' : 'See More'}
                </p>
              )}
            </p>
          </div>
          <div className='description events'>
            <h4>UPCOMING EVENTS</h4>
            <p>
              <span>General Info Session</span>
              <span>15 /04/2024</span>
            </p>
          </div>
        </section>
      </article>
    </Wrapper>
  )
}

export default SingleGroup
