import React, { useState } from 'react'
import { MdOutlineCheckBox } from 'react-icons/md'
import groupImg from '../../assets/images/group-img.png'
import { useNavigate } from 'react-router-dom'

const MyGroups = ({ groups }) => {
  const [visibleGroups, setVisibleGroups] = useState(4) // Number of initially visible groups
  const navigate = useNavigate()
  const handleLoadMore = () => {
    setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 4) // Increase by 4 for each load more click
  }

  return (
    <article className=' my-groups'>
      <section className='all-groups-section'>
        {groups.slice(0, visibleGroups).map(
          (
            item,
            index // Only map through visible groups
          ) => (
            <div className='content my' key={index}>
              <div className='img img-my'>
                <img src={groupImg} alt={`group-img-${index}`} />
              </div>
              <div className='my-group-content'>
                <h5
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(`/group/${index}`, { state: { item } })
                  }
                  id='heading'
                >
                  {item.name}
                </h5>
                <p>
                  {item?.privacy === 'public' ? 'All' : item.members?.length}{' '}
                  Members
                </p>
                <p id='desc'>{item.description}</p>
              </div>
            </div>
          )
        )}
        {visibleGroups < groups.length && ( // Show load more button if there are more groups to display
          <button className='member loadmore group' onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </section>
    </article>
  )
}

export default MyGroups
