import profile from '../../assets/images/profile.png'
import Wrapper from '../../assets/wrappers/Feeds'
import { BsThreeDots } from 'react-icons/bs'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { CgProfile } from 'react-icons/cg'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { BsCameraVideo } from 'react-icons/bs'
import userService from '../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import formatTimeAgo from '../../utils/utilsFunction'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'
import Updates from '../../components/feed-page/Updates'
import { useSelector } from 'react-redux';

const Feeds = () => {
  const { user } = useSelector((store) => store.user);
  const pageNum = 1
  const pageLimit = 10

  const feeds = useQuery({
    queryKey: ['get-feeds'],
    queryFn: (page, limit) => userService.getFeeds(pageNum, pageLimit),
  })

  return (
    <Wrapper>
      <article className='feeds'>
        <section className='search'>
          <CgProfile className='icon' />
          <div className='search'>
            <input type='text' placeholder='search' />
          </div>
          <HiOutlinePhotograph className='icon' />
          <BsCameraVideo className='icon' />
        </section>

        {feeds.isPending
          ? [1, 2, 3, 4, 5].map((n) => (
            <SkeletonArticle key={n} theme='light' />
          ))
          : feeds?.data?.results?.map((feed, index) => (
            <section key={index} className='feeds-card'>
              <div>
                <div className='feeds-content'>
                  <div>
                    <img
                      src={profile}
                      width={34}
                      alt='profile'
                      className='profile'
                    />
                  </div>
                  <div>
                    <p>{(user._id === feed.user && feed.type === "new-reg") ? "You became a registered member" : feed.message}</p>
                    <p className='time'>{formatTimeAgo(feed.createdAt)}</p>
                  </div>
                </div>
                <div className='feeds-icons'>
                  <p>
                    <SlLike className='feed-icon' /> Like
                  </p>
                  <p>
                    <TfiCommentAlt className='feed-icon' /> Comment
                  </p>
                </div>
              </div>
              <div>
                <BsThreeDots />
              </div>
            </section>
          ))}
      </article>
      <Updates />
    </Wrapper>
  )
}
export default Feeds
