import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Messages'
import profile from '../../assets/images/profile.png'
import { BiMailSend } from 'react-icons/bi'
import { TfiLink } from 'react-icons/tfi'
import { BsCameraVideo } from 'react-icons/bs'
import { SlPicture } from 'react-icons/sl'
const Messages = () => {
  const [activeTab, setActiveTab] = useState('all-members')

  return (
    <Wrapper>
      <article className='tab-content'>
        <h2>Messages</h2>
      </article>

      <article className='members-container'>
        <section>
          <div className='tabs'>
            <div>
              <h3>My Messages</h3>
            </div>
          </div>

          <div className='friends-list'>
            <div className='friends-img'>
              <img src={profile} alt='' />
            </div>
            <div>
              <p className='username'>Gbadebo Gbadamosi</p>
              <p className='msg'>When are we starting exams?</p>
              <p className='time'>3 days ago</p>
            </div>
          </div>

          <div className='friends-list'>
            <div className='friends-img'>
              <img src={profile} alt='' />
            </div>
            <div>
              <p className='username'>Gbadebo Gbadamosi</p>
              <p className='msg'>When are we starting exams?</p>
              <p className='time'>3 days ago</p>
            </div>
          </div>
        </section>
        <section>
          <div className='tabs'>
            <div>
              <h3>Gbadebo Gbadamosi </h3>
            </div>
          </div>

          <div className='chat'>
            <p className='sender'>Gbadebo Gbadamosi</p>
            <p className='message'>When are we starting exams?</p>
            <p className='time-sent'>12:00pm</p>
          </div>

          <div className='align-end'>
            <div className='msg-container'>
              <div className='send-msg'>
                <input type='text' placeholder='Write message here....' />
                <SlPicture className='icon' />
                <BsCameraVideo className='icon' />
                <TfiLink className='icon' />
              </div>

              <button className='send-btn'>
                <BiMailSend className='icon' /> Send
              </button>
            </div>
          </div>
        </section>
      </article>
    </Wrapper>
  )
}

export default Messages
