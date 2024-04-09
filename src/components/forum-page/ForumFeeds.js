import React, { useState } from 'react'
import profileImg from '../../assets/images/profile.png'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { LuSendHorizonal } from 'react-icons/lu'

const ForumFeeds = () => {
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

  const [openCommentIndex, setOpenCommentIndex] = useState(null)
  const [commentInput, setCommentInput] = useState('')

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
      {postData.posts.map((post) => (
        <div key={post.id}>
          <div className='post'>
            <div className='post-author'>
              <div className='img'>
                <img src={post.img} alt='' />
              </div>
              <div>
                <h3>{post.author}</h3>
                <p>
                  {post.time} | <span className='name'>Joseph Luper</span>
                </p>
              </div>
            </div>
            <div className='post-content'>
              <p>{post.content}</p>
            </div>
            <div className='post-likes'>
              <div className='img' id='img'>
                <img src={post.img} alt='' />
                <img src={post.img} alt='' />
                <img src={post.img} alt='' />
                <img src={post.img} alt='' />
              </div>
              <p onClick={() => toggleCommentInput(post.id, 'post')}>
                <TfiCommentAlt className='icon' />
                <span>{post.commentsNo} comments</span>
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

export default ForumFeeds
