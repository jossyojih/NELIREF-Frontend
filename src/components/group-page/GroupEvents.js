import React from 'react'
import banner from '../../assets/images/info-session.png'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'

const jsonData = [
  {
    heading: 'General info Session',
    banner: banner,
    paragraph:
      'We are going to be talking about what this group is about and how you can benefit from the group.',
    date: 'Today | 18:00 GMT +1',
  },
  {
    heading: 'General info Session',
    banner: banner,
    paragraph:
      'We are going to be talking about what this group is about and how you can benefit from the group.',
    date: 'Today | 18:00 GMT +1',
  },
  {
    heading: 'General info Session',
    banner: banner,
    paragraph:
      'We are going to be talking about what this group is about and how you can benefit from the group.',
    date: 'Today | 18:00 GMT +1',
  },
]

const GroupEvents = ({ id }) => {
  const getGroupEvents = useQuery({
    queryKey: [''],
    queryFn: () => userServices.getGroupEvents(id),
  })
  const options = { month: 'long', day: 'numeric' }
  const events = getGroupEvents?.data?.posts

  console.log(getGroupEvents)
  return (
    <div className='post event'>
      {events?.map((item, index) => (
        <div key={index} className='card'>
          <div className='card-img'>
            <img src={item.file.url} alt='' />
          </div>
          <p className='time'>
            {' '}
            {new Date(item.eventDate).toLocaleDateString('en-US', options)}
          </p>
          <p>
            {' '}
            <span>
              {item.startTime} to {item.endTime}
            </span>
          </p>
          <h2>{item.title}</h2>
          <p className='content'>{item.summary}</p>
        </div>
      ))}
    </div>
  )
}

export default GroupEvents
