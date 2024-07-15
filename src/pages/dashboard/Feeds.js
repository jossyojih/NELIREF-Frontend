import React, { useState, useEffect, useRef } from 'react'
import profile from '../../assets/images/profile.png'
import Wrapper from '../../assets/wrappers/Feeds'
import { BsThreeDots } from 'react-icons/bs'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { CgProfile } from 'react-icons/cg'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { BsCameraVideo } from 'react-icons/bs'
import userService from '../../services/api/user'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import formatTimeAgo from '../../utils/utilsFunction'
import Updates from '../../components/feed-page/Updates'
import { IoSendSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import PostCard from '../../components/feed-page/Postcard'

const Feeds = () => {
  const { user } = useSelector((store) => store.user)
  const [pageNum, setPageNum] = useState(1)
  const pageLimit = 10
  const containerRef = useRef(null)

  const queryClient = useQueryClient()

  // State to keep track of all data
  const [allData, setAllData] = useState([])

  // Fetch feeds using useQuery
  const { isPending, data } = useQuery({
    queryKey: ['get-feeds', pageNum],
    queryFn: () => userService.getFeeds(pageNum, pageLimit),
    keepPreviousData: true,
    onSuccess: (newData) => {
      if (pageNum === 1) {
        setAllData(newData.results)
      } else {
        setAllData((prevData) => [...prevData, ...newData.results])
      }
    },
  })

  console.log(allData)

  // State to track which comment input is open
  const [openCommentIndex, setOpenCommentIndex] = useState(null)

  // State to track comment input values
  const [commentInputs, setCommentInputs] = useState({})

  // Function to toggle comment input visibility
  const toggleCommentInput = (index) => {
    setOpenCommentIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleCommentChange = (index, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  const likeMutation = useMutation({
    mutationFn: (id) => userService.likeFeed(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-feeds'])
    },
    onError: (error) => {
      console.error('Like error:', error)
      toast.error('Error')
    },
  })

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => userService.commentFeed(id, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-feeds'])
      toast.success('Comment added successfully')
    },
    onError: (error) => {
      console.error('Comment error:', error)
      toast.error('Error adding comment')
    },
  })

  const handleLike = (id) => {
    console.log('Liking feed with id:', id)
    likeMutation.mutate(id)
  }

  const handleCommentSubmit = (e, feedId, index) => {
    e.preventDefault()
    const comment = commentInputs[index]
    if (comment) {
      commentMutation.mutate({ id: feedId, comment })
      setCommentInputs((prev) => ({
        ...prev,
        [index]: '',
      }))
    }
  }

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
    if (data?.results && pageNum === 1) {
      setAllData(data.results)
    }
  }, [data])

  return (
    <Wrapper ref={containerRef}>
      <article className='feeds'>
        {allData?.length > 0 ? (
          allData?.map((feed, index) => (
            <>
              {feed.group ? (
                <PostCard key={feed._id} post={feed} />
              ) : (
                <section key={index} className='feeds-card'>
                  <div>
                    <div className='feeds-content'>
                      <div>
                        <img
                          src={profile}
                          style={{ width: '40px' }}
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
                        <SlLike
                          style={{ cursor: 'pointer' }}
                          className={`feed-icon ${
                            feed.likes.includes(user._id) ? 'liked' : 'unlike'
                          }`}
                          onClick={() => handleLike(feed._id)}
                        />
                        {feed.likes.length === 0 ? 'like' : feed.likes.length}
                      </p>
                      <p
                        onClick={() => toggleCommentInput(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <TfiCommentAlt className='feed-icon' /> Comment
                      </p>
                      {/* Input button conditionally rendered based on openCommentIndex */}
                    </div>
                    {openCommentIndex === index && (
                      <div className='flex-input'>
                        <form
                          onSubmit={(e) =>
                            handleCommentSubmit(e, feed._id, index)
                          }
                        >
                          <input
                            type='text'
                            className='comment-input'
                            placeholder='Add a comment...'
                            value={commentInputs[index] || ''}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                          />
                          <button type='submit' className='icon-send'>
                            <IoSendSharp />
                          </button>
                        </form>
                      </div>
                    )}
                    <div className='comments'>
                      {feed.comments?.map((comment, index) => (
                        <p key={index}>{comment.comment}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </section>
              )}
            </>
          ))
        ) : (
          <p className='no-members'></p>
        )}
        {isPending && (
          <div className='center-rotate'>
            <RotatingLines
              type='Oval'
              style={{ color: '#FFF' }}
              height={20}
              width={20}
            />
          </div>
        )}
      </article>

      <Updates />
    </Wrapper>
  )
}

export default Feeds
