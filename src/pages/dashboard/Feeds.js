import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { RotatingLines } from 'react-loader-spinner'

const Feeds = () => {
  const { user } = useSelector((store) => store.user)
  const [pageNum, setPageNum] = useState(1)
  const pageLimit = 10
  const containerRef = useRef(null)

  // Fetch feeds using useQuery
  const { isPending, data, isPreviousData } = useQuery({
    queryKey: ['get-feeds', pageNum],
    queryFn: () => userService.getFeeds(pageNum, pageLimit),
    keepPreviousData: true,
  })

  // State to track which comment input is open
  const [openCommentIndex, setOpenCommentIndex] = useState(null)

  // Function to toggle comment input visibility
  const toggleCommentInput = (index) => {
    setOpenCommentIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // State to keep track of all data
  const [allData, setAllData] = useState([])

  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (
        !isPending &&
        scrollTop + clientHeight >= scrollHeight - 100 &&
        data?.results?.length >= pageLimit
      ) {
        setPageNum((prevPageNum) => prevPageNum + 1)
      }
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [isPending, data?.results?.length])

  useEffect(() => {
    if (data?.results) {
      setAllData((prevData) => [...prevData, ...data.results])
    }
  }, [data])

  return (
    <Wrapper ref={containerRef}>
      <article className='feeds'>
        <section className='search'>
          <CgProfile className='icon' />
          <div className='search'>
            <input type='text' placeholder='search' />
          </div>
          <HiOutlinePhotograph className='icon' />
          <BsCameraVideo className='icon' />
        </section>

        {isPending ? (
          <div className='center-rotate'>
            <RotatingLines
              type='Oval'
              style={{ color: '#FFF' }}
              height={20}
              width={20}
            />
          </div>
        ) : allData?.length > 0 ? (
          allData?.map((feed, index) => (
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
      </article>
      <Updates />
    </Wrapper>
  )
}

export default Feeds
