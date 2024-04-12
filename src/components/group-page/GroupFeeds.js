import React, { useState } from 'react'
import profileImg from '../../assets/images/profile.png'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { LuSendHorizonal } from 'react-icons/lu'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'

const GroupFeeds = ({ id }) => {
  const postData = {
    posts: [
      {
        id: 1,
        img: profileImg,
        time: '46 min. ago',
        author: 'John Doe',
        content: 'Just had an amazing hiking trip!',
        likes: 25,
        commentsNo: 24,
        comments: [
          {
            id: 101,
            img: profileImg,
            time: '46 min. ago',
            author: 'Jane Smith',
            content: 'Looks like fun! Where did you go?',
          },
          {
            id: 102,
            img: profileImg,
            time: '46 min. ago',
            author: 'Mike Johnson',
            content: 'Great photo! Wish I was there.',
          },
        ],
      },
      {
        id: 2,
        img: profileImg,
        time: '46 min. ago',
        author: 'Alice Johnson',
        content: 'Enjoying the sunset at the beach!',
        likes: 30,
        commentsNo: 24,
        comments: [
          {
            img: profileImg,
            time: '46 min. ago',
            id: 103,
            author: 'Bob Brown',
            content: 'Beautiful view!',
          },
        ],
      },
    ],
  }

  const getGroupPosts = useQuery({
    queryKey: ['get-groups-post'],
    queryFn: () => userServices.getGroupPost(id),
  })

  const groupPost = getGroupPosts?.data?.posts

  console.log(getGroupPosts)
  const [openCommentIndex, setOpenCommentIndex] = useState(null)
  const [commentInput, setCommentInput] = useState('')

  function formatTimeAgo(dateString) {
    const currentDate = new Date()
    const commentDate = new Date(dateString)

    const timeDifference = currentDate - commentDate
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)

    if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    } else {
      return 'Just now'
    }
  }

  const toggleCommentInput = (postId, commentIndex) => {
    setOpenCommentIndex((prevIndex) =>
      prevIndex === `${postId}-${commentIndex}`
        ? null
        : `${postId}-${commentIndex}`
    )
    setCommentInput('')
  }

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value)
  }

  const handleCommentSubmit = (postId, commentIndex) => {
    console.log('Comment submitted:', commentInput) // Replace with actual submission logic
    setOpenCommentIndex(null)
    setCommentInput('')
  }

  return (
    <div className='app'>
      {groupPost?.map((post) => (
        <div key={post.id}>
          <div className='post'>
            <div className='post-author'>
              <div className='img'>
                <img src={profileImg} alt='' />
              </div>
              <div>
                <h3>{post.author}</h3>
                <p>{formatTimeAgo(post.createdAt)}</p>
              </div>
            </div>
            <div className='post-content'>
              <p>{post.message}</p>
            </div>
            <div className='post-likes'>
              <p>
                <SlLike className='icon' />
                <span>{post.likes.length} likes</span>
              </p>
              <p onClick={() => toggleCommentInput(post.id, 'post')}>
                <TfiCommentAlt className='icon' />
                <span>{post.comments.length} comments</span>
              </p>
              {openCommentIndex === `${post.id}-post` && (
                <div className='comment-input-container'>
                  <input
                    type='text'
                    className='comment-input'
                    placeholder='Add a comment...'
                    value={commentInput}
                    onChange={handleCommentChange}
                  />
                  <button
                    className='comment-submit-btn'
                    onClick={() => handleCommentSubmit(post.id, 'post')}
                  >
                    <LuSendHorizonal />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='comments'>
            {post.comments.map((comment, commentIndex) => (
              <div key={comment.id} className='comment'>
                <div className='post-author'>
                  <div className='img'>
                    <img src={comment.img} alt='' />
                  </div>
                  <div>
                    <h3>{comment.author}</h3>
                    <p>{comment.time}</p>
                  </div>
                </div>
                <div className='post-content'>
                  <p>{comment.content}</p>
                </div>
                <div className='post-likes'>
                  <p>
                    <SlLike className='icon' />
                    <span>{post.likes} likes</span>
                  </p>
                  <p onClick={() => toggleCommentInput(post.id, commentIndex)}>
                    <TfiCommentAlt className='icon' />
                    <span>{post.commentsNo} comments</span>
                  </p>
                  {openCommentIndex === `${post.id}-${commentIndex}` && (
                    <div className='comment-input-container'>
                      <input
                        type='text'
                        className='comment-input'
                        placeholder='Add a comment...'
                        value={commentInput}
                        onChange={handleCommentChange}
                      />
                      <button
                        className='comment-submit-btn'
                        onClick={() =>
                          handleCommentSubmit(post.id, commentIndex)
                        }
                      >
                        <LuSendHorizonal />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GroupFeeds
