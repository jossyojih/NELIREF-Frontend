import React, { useState, useEffect } from 'react'
import profileImg from '../../assets/images/profile.png'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { LuSendHorizonal } from 'react-icons/lu'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import formatTimeAgo from '../../utils/utilsFunction'

const GroupFeeds = ({ id }) => {
  const queryClient = useQueryClient()

  const getGroupPosts = useQuery({
    queryKey: ['get-group-posts', id],
    queryFn: () => userServices.getGroupPost(id),
  })

  const groupPost = getGroupPosts?.data?.posts
  const [openCommentIndex, setOpenCommentIndex] = useState(null)
  const [commentInputs, setCommentInputs] = useState({})
  const [displayCount, setDisplayCount] = useState(2) // Initial display count

  const likeMutation = useMutation({
    mutationFn: (postId) => userServices.likeGroupPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-group-posts', id])
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
      queryClient.invalidateQueries(['get-group-posts', id])
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

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 3) // Increase display count by 3
  }

  return (
    <div className='app'>
      {getGroupPosts.isLoading
        ? [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        : groupPost?.slice(0, displayCount).map((post, index) => (
            <div key={post._id}>
              <div className='post'>
                <div className='post-author'>
                  <div className='img'>
                    <img src={profileImg} alt='' />
                  </div>
                  <div>
                    <h3>{'John Doe'}</h3>
                    <p>{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>
                <div className='post-content'>
                  {post.comments?.map((comment, index) => (
                    <p key={index}>{comment.comment}</p>
                  ))}
                </div>
                <div className='post-likes'>
                  <p id={post.likes.includes(post._id) ? 'liked' : 'unlike'}>
                    <SlLike onClick={() => handleLike(post._id)} />
                    <span>
                      {post.likes.length === 0 ? 'like' : post.likes.length}
                    </span>
                  </p>
                  <p onClick={() => toggleCommentInput(post._id, 'post')}>
                    <TfiCommentAlt className='icon' />
                    <span>
                      {post.comments.length === 0 ? '' : post.comments.length}{' '}
                      comments
                    </span>
                  </p>
                </div>
                {openCommentIndex === `${post._id}-post` && (
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
                          handleCommentChange(
                            `${post._id}-post`,
                            e.target.value
                          )
                        }
                      />
                      <button className='comment-submit-btn' type='submit'>
                        <LuSendHorizonal />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
      {groupPost && groupPost.length > displayCount && (
        <div className='d-flex'>
          <button className='load-more-btn' onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default GroupFeeds
