import React from 'react'
import banner from '../../assets/images/info-session.png'
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

const GroupEvents = () => {
  return (
    <div className='post event'>
      {jsonData.map((item, index) => (
        <div key={index} className='card'>
          <div className='card-img'> 
            <img src={item.banner} alt='' />
          </div>
          <p className='time'> {item.date}</p>
          <h2>{item.heading}</h2>
          <p className='content'>{item.paragraph}</p>
        </div>
      ))}
    </div>
  )
}

export default GroupEvents
