import React, { useState } from 'react'
import { MdOutlineCheckBox } from 'react-icons/md'
import userService from '../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import forumImg from '../../assets/images/group-img.png'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { Link, useNavigate } from 'react-router-dom'

const MyForums = () => {
  const navigate = useNavigate()
  const [visibleForums, setVisibleForums] = useState(4) // Number of initially visible forums

  const handleLoadMore = () => {
    setVisibleForums((prevVisibleForums) => prevVisibleForums + 4) // Increase by 4 for each load more click
  }

  const forums = useQuery({
    queryKey: ['get-forum'],
    queryFn: userService.getForums,
  })

  return (
    <article className='forums'>
      {forums.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <article className='all-groups'>
          <section>
            {forums?.data?.slice(0, visibleForums).map(
              (
                item,
                index // Only map through visible forums
              ) => (
                <div className='content' key={index}>
                  <div className='img'>
                    <img src={forumImg} alt={`group-img-${index}`} />
                  </div>
                  <div>
                    <h5
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        navigate(`/forum/${index}`, { state: { item } })
                      }
                    >
                      {item.name}
                    </h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            )}
            <button className='member' onClick={handleLoadMore}>
              <MdOutlineCheckBox className='icon' />
              Member
            </button>
          </section>
          {visibleForums < forums?.data?.length && ( // Show load more button if there are more forums to display
            <button className='member' onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </article>
      )}
      {forums.isError && <p>An Error Occurred</p>}
    </article>
  )
}

export default MyForums
