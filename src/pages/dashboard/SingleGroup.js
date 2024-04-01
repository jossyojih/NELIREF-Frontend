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

const SingleGroup = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('feeds')
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  // Access the item object from the location state
  const item = location.state?.item
  const groupId = item._id

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
      <article>
        <div>
          <img src={profileBg} alt='' />
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
          </div>
          <div>
            <h3 className='profile-name'>{item?.name}</h3>
            <p>
              {' '}
              <span>{item?.members?.length} Members</span> |{' '}
              <span> 243 Online</span>
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
              Members <span className='member-no'>{item?.members?.length}</span>
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
          {activeTab === 'feeds' && <GroupFeeds />}
          {activeTab === 'events' && <GroupEvents />}
          {activeTab === 'members' && <GroupMembers members={item?.members} />}
          {activeTab === 'files' && <GroupFiles />}
        </section>
        <section>
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
