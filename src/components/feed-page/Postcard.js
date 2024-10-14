import React, { useState } from 'react'
import profileImg from '../../assets/images/profile.png'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { LuSendHorizonal } from 'react-icons/lu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import { toast } from 'react-toastify'
import formatTimeAgo from '../../utils/utilsFunction'

// Function to shorten URLs and place them on a new line
const formatMessageWithLinks = (message) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return message.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      const shortenedUrl = part.length > 30 ? `${part.slice(0, 30)}...` : part
      return (
        <div key={index} style={{ marginTop: '.2rem' }}>
          <a
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#2a4d93', wordBreak: 'break-word' }}
          >
            {shortenedUrl}
          </a>
        </div>
      )
    }
    return part
  })
}

const PostCard = ({ post }) => {
  const queryClient = useQueryClient()
  const [openCommentIndex, setOpenCommentIndex] = useState(null)
  const [commentInputs, setCommentInputs] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)

  const MAX_CHAR_COUNT = 100 // Maximum characters to show before "See more"

  const likeMutation = useMutation({
    mutationFn: (postId) => userServices.likeGroupPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-group-posts', post.groupId])
      toast.success('Liked successfully')
    },
    onError: (error) => {
      console.error('Like error:', error)
      toast.error('Error liking post')
    },
  })

  const commentMutation = useMutation({
    mutationFn: ({ postId, comment }) =>
      userServices.groupComment(postId, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-group-posts', post.groupId])
      toast.success('Comment added successfully')
    },
    onError: (error) => {
      console.error('Comment error:', error)
      toast.error('Error adding comment')
    },
  })

  const handleLike = (postId) => {
    likeMutation.mutate(postId)
  }

  const handleCommentChange = (index, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  const handleCommentSubmit = (e, postId, index) => {
    e.preventDefault()
    const comment = commentInputs[index]
    if (comment) {
      commentMutation.mutate({ postId, comment })
      setCommentInputs((prev) => ({
        ...prev,
        [index]: '',
      }))
    }
  }

  const toggleCommentInput = (postId, commentIndex) => {
    setOpenCommentIndex((prevIndex) =>
      prevIndex === `${postId}-${commentIndex}`
        ? null
        : `${postId}-${commentIndex}`
    )
    setCommentInputs((prev) => ({
      ...prev,
      [`${postId}-${commentIndex}`]: '',
    }))
  }

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const getFormattedMessage = () => {
    const formattedMessage = formatMessageWithLinks(post.message)
    if (post.message.length <= MAX_CHAR_COUNT || isExpanded) {
      return formattedMessage
    }
    return (
      <>
        {formatMessageWithLinks(post.message.slice(0, MAX_CHAR_COUNT))}{' '}
        <span
          onClick={toggleExpanded}
          style={{ color: '#2a4d93', cursor: 'pointer' }}
        >
          See more
        </span>
      </>
    )
  }

  return (
    <div className='post'>
      <div>
        <div className='post-author'>
          <div style={{ padding: '0' }} className='img'>
            <img src={post.user.photo} alt='' />
          </div>
          <div>
            <h3>{post.user.full_name}</h3>
            <p>{formatTimeAgo(post.createdAt)}</p>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            margin: '1rem auto',
            height: '400px',
            objectFit: 'cover',
          }}
        >
          <img src={post.file.url} alt='' />
        </div>

        {/* Use the updated getFormattedMessage function here */}
        <p style={{ margin: '1rem 0' }}>{getFormattedMessage()}</p>

        {isExpanded && (
          <span
            onClick={toggleExpanded}
            style={{ color: '#2a4d93', cursor: 'pointer' }}
          >
            See less
          </span>
        )}

        <div style={{ marginLeft: '4rem' }} className='post-likes'>
          <p id={post.likes.includes(post._id) ? 'icon-liked' : 'icon-unlike'}>
            <SlLike
              style={{
                color: post.likes.includes('6606dea6827484b8c912dc50')
                  ? '#2a4d93'
                  : 'rgb(183, 180, 180)',
              }}
              onClick={() => handleLike(post._id)}
            />
            <span>{post.likes.length === 0 ? 'like' : post.likes.length}</span>
          </p>
          <p onClick={() => toggleCommentInput(post._id, 'post')}>
            <TfiCommentAlt style={{ cursor: 'pointer' }} className='icon' />
            <span>
              {post.comments.length === 0 ? '' : post.comments.length} comments
            </span>
          </p>
        </div>

        {openCommentIndex === `${post._id}-post` && (
          <div>
            <div className='comment-input-container'>
              <form
                onSubmit={(e) =>
                  handleCommentSubmit(e, post._id, `${post._id}-post`)
                }
              >
                <input
                  type='text'
                  className='comment-input'
                  placeholder='Add a comment...'
                  value={commentInputs[`${post._id}-post`] || ''}
                  onChange={(e) =>
                    handleCommentChange(`${post._id}-post`, e.target.value)
                  }
                />
                <button className='comment-submit-btn' type='submit'>
                  <LuSendHorizonal />
                </button>
              </form>
            </div>

            <div className='post-content'>
              {post.comments?.map((comment, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'start',
                    marginTop: '1.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '50%',
                    }}
                    src={comment.by.photo}
                    alt=''
                  />
                  <div>
                    <h3
                      style={{ color: 'rgb(42, 77, 147)', fontWeight: '400' }}
                    >
                      {comment.by.full_name}
                    </h3>
                    <p style={{ fontSize: '12px' }}>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
