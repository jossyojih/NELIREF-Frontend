import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Profile'
import { CiUser } from 'react-icons/ci'
import profileBg from '../../assets/images/profile-bg.png'
import profile from '../../assets/images/profile.png'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import OtherUserActivity from '../../components/other-user-profile/OtherUserActivity'
import OtherUserDetails from '../../components/other-user-profile/OtherUserDetails'

import { useParams } from 'react-router-dom'
const OthersProfile = () => {
  const [activeTab, setActiveTab] = useState('all-members')
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  const getOtherUserProfile = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: () => userServices.getOthersProfile(id),
  })

  console.log(getOtherUserProfile)
  return (
    <Wrapper>
      <article>
        <div>
          <img src={profileBg} alt='' />
        </div>
        <section className='profile-summary'>
          <div className='profile-image'>
            <img
              src={getOtherUserProfile?.data?.photo || profile}
              alt=''
              className='img'
            />
          </div>
          <div>
            <h3 className='profile-name'>
              {getOtherUserProfile?.data?.full_name}
            </h3>
            <p className='profile-infor'>
              @{getOtherUserProfile?.data?.user_name} | Joined{' '}
              {new Date(getOtherUserProfile?.data?.createdAt).toLocaleString(
                'en-US',
                {
                  month: 'long',
                  year: 'numeric',
                }
              )}{' '}
              | <span className='active-now'>Active now</span>
            </p>
            <div className='connections'>
              <div className='connectors'>
                <CiUser className='icon' />
              </div>

              <p>
                {getOtherUserProfile?.data?.length || 0} connection
                {getOtherUserProfile?.data?.length == 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </section>
      </article>

      <article className='members-container'>
        <section className='tabs'>
          <div className='groups'>
            <div
              onClick={() => setActiveTab('all-members')}
              className={`tab-btn ${
                activeTab === 'all-members' ? 'active' : ''
              }`}
            >
              <h4>My Details</h4>
            </div>
            <div
              onClick={() => setActiveTab('my-connections')}
              className={`tab-btn ${
                activeTab === 'my-connections' ? 'active' : ''
              }`}
            >
              <h4>My Activity</h4>
            </div>
          </div>
        </section>

        <section>
          {activeTab === 'all-members' && (
            <OtherUserDetails user={getOtherUserProfile?.data} id={id} />
          )}
          {activeTab === 'my-connections' && <OtherUserActivity />}
        </section>
      </article>
    </Wrapper>
  )
}

export default OthersProfile
