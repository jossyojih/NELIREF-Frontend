import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Events'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from 'react-icons/io'
import { RiHotspotLine } from 'react-icons/ri'
import { BsCalendar2Event } from 'react-icons/bs'
import AddEventModal from '../../components/Modals/AddEventModal'
import { useQuery } from '@tanstack/react-query'
import userService from '../../services/api/user'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'
import { useSelector } from 'react-redux'

const events = [
  {
    date: 'April 2021',
    time: '11:00AM - 2:00PM EST',
    title: 'NELRIF April Scholarship Conference',
    eventType: 'Virtual Event',
    summary: 'Summary of events goes here....',
  },
  // Add more events as needed
]

const Events = () => {
  const [activeTab, setActiveTab] = useState('all-members')
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [visibleEvents, setVisibleEvents] = useState(2) // Number of initially visible events
  const options = { month: 'long', day: 'numeric' }
  const { user } = useSelector((store) => store.user)
  const openAddEventModal = () => {
    setIsAddEventModalOpen(true)
  }

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false)
  }

  const getEvents = useQuery({
    queryKey: ['get-upload-events'],
    queryFn: userService.getEvents,
  })

  const data = getEvents?.data?.events

  const handleLoadMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 2) // Increase by 4 for each load more click
  }

  return (
    <Wrapper>
      {isAddEventModalOpen && <AddEventModal onClose={closeAddEventModal} />}
      <article className='tab-content'>
        <h2>Events</h2>
        {user.userType === 'admin' || user.userType === 'super-admin' ? (
          <div className='btn-primary '>
            <BsCalendar2Event className='icon' />
            <button onClick={openAddEventModal}>Add Event</button>
          </div>
        ) : null}
      </article>

      <article className='members-container'>
        <section className='tabs'>
          <div className='groups'>
            <div>
              <h4 className='today'>Today</h4>
            </div>
            <div>
              <h4 className='upcoming'>
                Upcoming
                <IoIosArrowDown />
              </h4>
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
        {getEvents.isPending ? (
          [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        ) : (
          <section className='event-container'>
            <section>
              {data?.slice(0, visibleEvents).map((event, index) => (
                <section className='events' key={index}>
                  <div className='event-content'>
                    <p>
                      {new Date(event.eventDate).toLocaleDateString(
                        'en-US',
                        options
                      )}{' '}
                      - {event.startTime} - {event.endTime} WAT
                    </p>
                    <h5>{event.title}</h5>
                    <div className='virtual-event'>
                      <RiHotspotLine className='icon' />
                      <p>{event.type}</p>
                    </div>
                    <p className='summary'>{event.summary}</p>
                  </div>
                  <div className='picture'>
                    <img src={event.file.url} alt='' />
                  </div>
                </section>
              ))}
            </section>
            {visibleEvents < data?.length && (
              <div className='flex-btn'>
                <button className='member' onClick={handleLoadMore}>
                  Load more
                </button>
              </div>
            )}
          </section>
        )}
      </article>
      {getEvents.isError && <p>An Error Occurred</p>}
    </Wrapper>
  )
}

export default Events
