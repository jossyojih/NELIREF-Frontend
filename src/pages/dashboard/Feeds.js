import React, { useState, useEffect } from 'react'
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
import { IoSendSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

const Feeds = () => {
  const { user } = useSelector((store) => store.user)
  const [pageNum, setPageNum] = useState(1)
  const pageLimit = 10

  // Fetch feeds using useQuery
  const feeds = useQuery({
    queryKey: ['get-feeds'],
    queryFn: (page, limit) => userService.getFeeds(pageNum, pageLimit),
  })

  // State to track which comment input is open
  const [openCommentIndex, setOpenCommentIndex] = useState(null)

  // Function to toggle comment input visibility
  const toggleCommentInput = (index) => {
    setOpenCommentIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // Function to handle page navigation
  const handlePageNavigation = (direction) => {
    if (direction === 'next') {
      setPageNum((prevPageNum) => prevPageNum + 1)
    } else if (direction === 'prev' && pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1)
    }
  }

  useEffect(() => {
    // Additional logic can be added here if needed
  }, [feeds])

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

        {feeds.isPending ? (
          [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        ) : feeds?.data?.results?.length > 0 ? (
          feeds.data.results.map((feed, index) => (
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
                    <p>
                      {user._id === feed.user && feed.type === 'new-reg'
                        ? 'You became a registered member'
                        : feed.message}
                    </p>
                    <p className='time'>{formatTimeAgo(feed.createdAt)}</p>
                  </div>
                </div>
                <div className='feeds-icons'>
                  <p>
                    <SlLike className='feed-icon' /> Like
                  </p>
                  <p onClick={() => toggleCommentInput(index)}>
                    <TfiCommentAlt className='feed-icon' /> Comment
                  </p>
                  {/* Input button conditionally rendered based on openCommentIndex */}
                  {openCommentIndex === index && (
                    <div className='flex-input'>
                      <input
                        type='text'
                        className='comment-input'
                        placeholder='Add a comment...'
                      />
                      <IoSendSharp className='icon-send' />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <BsThreeDots />
              </div>
            </section>
          ))
        ) : (
          <p className='no-members'>No more members to display</p>
        )}
        <div
          className='nav-btn'
          style={{
            display: feeds?.data?.results?.length > 0 ? 'flex' : 'none',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => handlePageNavigation('prev')}
            disabled={pageNum <= 1}
          >
            <MdOutlineArrowBackIosNew />
          </button>
          <button
            onClick={() => handlePageNavigation('next')}
            disabled={feeds?.data?.results?.length === 0}
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </article>
      <Updates />
    </Wrapper>
  )
}

export default Feeds
