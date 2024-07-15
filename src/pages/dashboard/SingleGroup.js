import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Group'
import profileBg from '../../assets/images/profile-bg.png'
import profile from '../../assets/images/profile.png'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import { useParams, useLocation } from 'react-router-dom'
import GroupFeeds from '../../components/group-page/GroupFeeds'
import GroupEvents from '../../components/group-page/GroupEvents'
import GroupMembers from '../../components/group-page/GroupMembers'
import GroupFiles from '../../components/group-page/GroupFiles'
import { LiaEdit } from 'react-icons/lia'
import { SlCalender } from 'react-icons/sl'
import { IoStatsChartOutline } from 'react-icons/io5'
import { CiCalendar, CiFolderOn } from 'react-icons/ci'
import AddGroupEventModal from '../../components/Modals/AddGroupEventModal'
import CreatePollModal from '../../components/Modals/CreatePollModal'
import MakePostModal from '../../components/Modals/MakePostModal'
import AddGroupDocumentModal from '../../components/Modals/AddGroupDocumentModal'
import EditGroup from '../../components/Modals/EditGroup'
import EditGroupPhoto from '../../components/Modals/EditGroupPhoto'
import { CiEdit } from 'react-icons/ci'

const SingleGroup = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('feeds')
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false)
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false)

  const openIsEditPhotoModal = () => {
    setIsEditPhotoModalOpen(true)
  }

  const closeIsEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false)
  }

  const openEditGroupModal = () => {
    setIsEditGroupModalOpen(true)
  }
  const closeEditGroupModal = () => {
    setIsEditGroupModalOpen(false)
  }
  // Access the item object from the location state
  const item = location.state?.item
  const groupId = item._id

  console.log(item)

  const openAddEventModal = () => {
    setIsAddEventModalOpen(true)
  }

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false)
  }

  const [isCreatePollModalOpen, setIsCreatePollModalOpen] = useState(false)

  const openCreatePollModal = () => {
    setIsCreatePollModalOpen(true)
  }

  const closeCreatePollModal = () => {
    setIsCreatePollModalOpen(false)
  }

  const [isMakePostModalOpen, setIsMakePostModalOpen] = useState(false)

  const openMakePostModal = () => {
    setIsMakePostModalOpen(true)
  }

  const closeMakePostModal = () => {
    setIsMakePostModalOpen(false)
  }

  const [isAddGroupDocumentModalOpen, setIsAddGroupDocumentModalOpen] =
    useState(false)

  const openAddGroupDocumentModal = () => {
    setIsAddGroupDocumentModalOpen(true)
  }

  const closeAddGroupDocumentModal = () => {
    setIsAddGroupDocumentModalOpen(false)
  }

  // const getOtherUserProfile = useQuery({
  //   queryKey: ['get-user-profile'],
  //   queryFn: () => userServices.getOthersProfile(id),
  // })

  return (
    <Wrapper>
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
      {/* {isEditPhotoModalOpen && (
        <EditGroupPhoto onClose={closeIsEditPhotoModal} id={groupId} />
      )} */}

      <article>
        <div className='bg-img-container'>
          <img src={profileBg} alt='' />
          <span className='edit-profile' onClick={openEditGroupModal}>
            <CiEdit className='icon-edit' />
          </span>
        </div>
        <section className='profile-summary'>
          <div className='profile-image'>
            <img
              src={
                // getOtherUserProfile?.data?.photo ||
                profile
              }
              alt=''
              className='img'
            />
            <span className='edit-photo'>
              <CiEdit className='icon-edit' />
            </span>
          </div>
          <div>
            <h3 className='profile-name'>{item?.name}</h3>
            <p>
              {item?.privacy === 'public' ? (
                <p>
                  <span> All Members</span> | <span> {} Online</span>
                </p>
              ) : (
                <p>
                  <span>{item?.members?.length} Members</span> |{' '}
                  <span> {} Online</span>
                </p>
              )}
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
              {item?.privacy === 'public' ? (
                ''
              ) : (
                <p>
                  Members {''}{' '}
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
            <button onClick={openMakePostModal}>
              <LiaEdit /> Make a post
            </button>
            <button onClick={openAddEventModal}>
              <CiCalendar /> Create an Event
            </button>
            <button onClick={openCreatePollModal}>
              <IoStatsChartOutline /> Create a Poll
            </button>
            <button onClick={openAddGroupDocumentModal}>
              <CiFolderOn /> Upload a File
            </button>
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
            <p>{item?.description} </p>
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
