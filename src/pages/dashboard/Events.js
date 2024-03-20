import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Events'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from 'react-icons/io'
import { RiHotspotLine } from 'react-icons/ri'
import { BsImage } from 'react-icons/bs'
import { BsCalendar2Event } from 'react-icons/bs'
import AddEventModal from '../../components/Modals/AddEventModal'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'

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
  const options = { month: 'long', day: 'numeric' }

  const openAddEventModal = () => {
    setIsAddEventModalOpen(true)
  }

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false)
  }

  const getEvents = useQuery({
    queryKey: ['get-upload-events'],
    queryFn: user.getEvents,
  })

  const data = getEvents?.data?.events
  console.log(data)

  return (
    <Wrapper>
      {isAddEventModalOpen && <AddEventModal onClose={closeAddEventModal} />}
      <article className='tab-content'>
        <h2>Events</h2>
        <div className='btn-primary '>
          <BsCalendar2Event className='icon' />
          <button onClick={openAddEventModal}>Add Event</button>
        </div>
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
              {data?.map((event, index) => (
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
          </section>
        )}
      </article>
      {getEvents.isError && <p>An Error Occured</p>}
    </Wrapper>
  )
}

export default Events
