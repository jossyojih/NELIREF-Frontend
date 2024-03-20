import React from 'react'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import profile from '../../assets/images/profile.png'
import SkeletonArticle from '../skeletons/SkeletonArticle'

const Updates = () => {
  const { data, isPending } = useQuery({
    queryKey: ['get-updates'],
    queryFn: user.getUpdates,
  })

  return (
    <article className='updates'>
      <h3>Latest Updates </h3>

      {isPending
        ? [1].map((n) => <SkeletonArticle key={n} theme='light' />)
        : data?.updates?.map((update) => (
            <section>
              <div className='updates-content'>
                <div>
                  <img
                    src={profile}
                    width={40}
                    alt='profile'
                    className='profile'
                  />
                </div>
                <div>
                  <p>
                    Your request to the <span>Undergraduate group</span> has
                    been approved
                  </p>
                  <p className='period'>2 days ago</p>
                </div>
              </div>
            </section>
          ))}
      {!isPending && data?.updates?.length > 1 && (
        <div className='btn-more'>
          <button className='btn-primary '>More Updates</button>
        </div>
      )}
    </article>
  )
}

export default Updates
