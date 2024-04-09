import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/SingleForum'
import profileBg from '../../assets/images/profile-bg.png'
import profile from '../../assets/images/profile.png'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { useParams, useLocation } from 'react-router-dom'
import GroupFeeds from '../../components/group-page/GroupFeeds'
import AddGroupEventModal from '../../components/Modals/AddGroupEventModal'
import CreatePollModal from '../../components/Modals/CreatePollModal'
import MakePostModal from '../../components/Modals/MakePostModal'
import AddGroupDocumentModal from '../../components/Modals/AddGroupDocumentModal'
import ForumFeeds from '../../components/forum-page/ForumFeeds'

const SingleForum = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('feeds')
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  // Access the item object from the location state
  const item = location.state?.item
  const groupId = item._id

  // const getOtherUserProfile = useQuery({
  //   queryKey: ['get-user-profile'],
  //   queryFn: () => userServices.getOthersProfile(id),
  // })

  return (
    <Wrapper>
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
            <h3 className='profile-name'>Scholarship Information</h3>
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
              Discussions
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
            <div>
              <input
                className='input'
                type='text'
                placeholder='Start a Discussion to get feedback from other users'
              />
            </div>
            <button>Start Discussions</button>
          </div>
          {activeTab === 'feeds' && <ForumFeeds id={groupId} />}
        </section>
        <section className='aside'>
          <div className='description'>
            <h4>DESCRIPTION</h4>
            <p>
              A group crafted to inform you about everything going on, on this
              platform. We are here to answer all your questiona dn queries{' '}
            </p>
          </div>
        </section>
      </article>
    </Wrapper>
  )
}

export default SingleForum
