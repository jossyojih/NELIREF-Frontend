import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Profile'
import { CiUser } from 'react-icons/ci'
import profileBg from '../../assets/images/profile-bg.png'
import profile from '../../assets/images/profile.png'
import MyActivity from '../../components/profile-page/MyActivity'
import MyDetails from '../../components/profile-page/MyDetails'
import { useSelector } from "react-redux";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('all-members')
  const { user } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <article>
        <div>
          <img src={profileBg} alt='' />
        </div>
        <section className='profile-summary'>
          <div className='profile-image'>
            <img src={user?.photo || profile} alt='' className='img' />
          </div>
          <div >
            <h3 className='profile-name'>{user?.full_name}</h3>
            <p className='profile-infor'>
              @{user?.user_name} | Joined {new Date(user?.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })} | <span className='active-now'>Active now</span>
            </p>
            <div className='connections'>
              <div className='connectors'>
                <CiUser className='icon' />
              </div>

              <p>{user?.connections?.length || 0} connection{user?.connections?.length == 1 ? "" : "s"}</p>
            </div>
          </div>
        </section>
      </article>

      <article className='members-container'>
        <section className='tabs'>
          <div className='groups'>
            <div
              onClick={() => setActiveTab('all-members')}
              className={`tab-btn ${activeTab === 'all-members' ? 'active' : ''
                }`}
            >
              <h4>My Details</h4>
            </div>
            <div
              onClick={() => setActiveTab('my-connections')}
              className={`tab-btn ${activeTab === 'my-connections' ? 'active' : ''
                }`}
            >
              <h4>My Activity</h4>
            </div>
          </div>
        </section>

        <section>
          {activeTab === 'all-members' && <MyDetails user={user} />}
          {activeTab === 'my-connections' && <MyActivity />}
        </section>
      </article>
    </Wrapper>
  )
}

export default Profile
