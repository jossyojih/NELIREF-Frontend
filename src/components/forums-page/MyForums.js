import group from '../../assets/images/group-img.png'
import emptystate from '../../assets/images/empty-state.png'
import { MdOutlineCheckBox } from 'react-icons/md'
import userService from '../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import forumImg from '../../assets/images/group-img.png'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { Link, useNavigate } from 'react-router-dom'

const MyForums = () => {
  const navigate = useNavigate()
  const data = 1
  const data2 = [
    {
      imgSrc: group,
      title: 'New members Questions and Answers',
      membersCount: '12,003 Members',
      description: 'All Questions concerning our platform can be asked here',
    },
    // Add more objects as needed
  ]

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
            {forums?.data?.map((item, index) => (
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
            ))}
            <button className='member'>
              <MdOutlineCheckBox className='icon' />
              Member
            </button>
          </section>
        </article>
      )}
      {forums.isError && <p>An Error Occured</p>}
    </article>
  )
}

export default MyForums
