import React from 'react'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import SkeletonGridCard from '../../components/skeletons/SkeletonGridCard'

const GroupEvents = ({ id }) => {
  const getGroupEvents = useQuery({
    queryKey: [''],
    queryFn: () => userServices.getGroupEvents(id),
  })
  const options = { month: 'long', day: 'numeric' }
  const events = getGroupEvents?.data?.posts
  const pending = true

  console.log(getGroupEvents)

  return (
    <div>
      {getGroupEvents.isPending ? (
        <section>
          <div className='flex-skel'>
            {[1, 2, 3].map((n) => (
              <SkeletonGridCard key={n} theme='light' />
            ))}
          </div>
        </section>
      ) : (
        <div className='post event'>
          {events?.map((item, index) => (
            <div key={index} className='card'>
              <div className='card-img'>
                <img src={item.file.url} alt='' />
              </div>
              <p className='time'>
                {new Date(item.eventDate).toLocaleDateString('en-US', options)}
              </p>
              <p>
                <span>
                  {item.startTime} to {item.endTime}
                </span>
              </p>
              <h2>{item.title}</h2>
              <p className='content'>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GroupEvents
