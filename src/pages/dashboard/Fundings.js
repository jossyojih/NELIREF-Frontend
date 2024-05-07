import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Events'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { CgAddR } from 'react-icons/cg'
import AddFundingModal from '../../components/Modals/AddFundingModal'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SkeletonGridCard from '../../components/skeletons/SkeletonGridCard'
import { useSelector } from 'react-redux'

const Fundings = () => {
  const [activeTab, setActiveTab] = useState('all-members')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddFundingModalOpen, setIsAddFundingModalOpen] = useState(false)
  const { user } = useSelector((store) => store.user)

  const closeAddFundingModal = () => {
    setIsAddFundingModalOpen(false)
  }
  const options = { month: 'long', day: 'numeric' }

  const openAddFundingModal = () => {
    setIsAddFundingModalOpen(true)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const getFundings = useQuery({
    queryKey: ['get-fundings'],
    queryFn: user.getFundings,
  })

  return (
    <Wrapper>
      {isAddFundingModalOpen && (
        <AddFundingModal onClose={closeAddFundingModal} />
      )}

      <article className='tab-content'>
        <h2>Fundings</h2>
        <div className='photos-search'>
          <div className='search'>
            <CiSearch className='search-icon' />
            <input type='text' placeholder='Search funding' />
          </div>

          {(user.userType === 'admin' || user.userType === 'super-admin') && (
            <div className='btn-primary fund' onClick={openAddFundingModal}>
              <CgAddR className='icon' />
              <button onClick={openAddFundingModal}>Create New Funding</button>
            </div>
          )}
        </div>
      </article>

      <article className='members-container'>
        <section className='tabs funding'>
          <div className='groups'>
            <div>
              <h4 className='today'>All</h4>
            </div>
            <div>
              <h4 className='upcoming'>Recent</h4>
            </div>
          </div>
          <div className='displays'>
            <div>
              <IoIosArrowBack />
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>
        </section>

        {getFundings.isPending ? (
          <div className='skeleton-grid'>
            {[1, 2, 3, 4].map((n) => (
              <SkeletonGridCard key={n} theme='light' />
            ))}
          </div>
        ) : (
          <section className='funding-grid'>
            {getFundings?.data?.fundings?.map((event, index) => (
              <section className='events forum' key={index}>
                <div className='cover-picture'>
                  <img src={event.image} alt='' />
                </div>
                <div className='event-content funding'>
                  <h5 className='title'>{event.title}</h5>
                  <p className='summary-funding'>{event.summary}</p>
                  <a
                    className='link'
                    href={event.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Visit Funding Page <FaArrowUpRightFromSquare />
                  </a>
                </div>
              </section>
            ))}
          </section>
        )}
        <div className='nav-btns'>
          <p>Older</p>
          <p>Newer</p>
        </div>
      </article>
    </Wrapper>
  )
}

export default Fundings
