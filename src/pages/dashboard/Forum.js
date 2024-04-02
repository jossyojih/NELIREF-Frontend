import Wrapper from '../../assets/wrappers/Forum'
import { CiSearch } from 'react-icons/ci'
import { CgAddR } from 'react-icons/cg'
import MyForums from '../../components/forums-page/MyForums'
import { useState } from 'react'
import ForumModal from '../../components/Modals/ForumModal'
import ForumRequest from '../../components/forums-page/ForumRequest'
import { useSelector } from 'react-redux';

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Photos')
  const { user } = useSelector((store) => store.user);
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }



  return (
    <Wrapper>
      <ForumModal isOpen={isModalOpen} onClose={closeModal} />
      <article className='tab-content'>
        <h2>Forums</h2>
        <div className='photos-search'>
          <div className='search'>
            <CiSearch className='search-icon' />
            <input type='text' placeholder='Search forum' />
          </div>
          {
            (user.userType === "admin" || user.userType === "super-admin") &&
            <div className='btn-primary '>
              <CgAddR className='icon' />
              <button onClick={openModal}>Create New Forum</button>
            </div>
          }

        </div>
      </article>

      <article>
        <section className='tabs'>
          <div className='groups'>
            <div className={`tab-btn active`}>
              <div className='groups'>
                <div
                  onClick={() => setActiveTab('Photos')}
                  className={`tab-btn ${activeTab === 'Photos' ? 'active' : ''
                    }`}
                >
                  <h4>
                    Forums <span className='number'>12</span>
                  </h4>
                </div>
                <div
                  onClick={() => setActiveTab('my-groups')}
                  className={`tab-btn ${activeTab === 'my-groups' ? 'active' : ''
                    }`}
                >
                  <h4>
                    Forums Request <span className='number-grey'> 1</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          {activeTab === 'Photos' && <MyForums />}
          {activeTab === 'my-groups' && <ForumRequest />}
        </section>
      </article>
    </Wrapper>
  )
}

export default Forum
