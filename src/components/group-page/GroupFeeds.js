import React from 'react'
import profileImg from '../../assets/images/profile.png'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'

const GroupFeeds = () => {
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
                <p>{post.time}</p>
              </div>
            </div>
            <div className='post-content'>
              <p> {post.content}</p>
            </div>
            <div className='post-likes'>
              <p>
                <SlLike className='icon' />
                <span>{post.likes} likes</span>
              </p>
              <p>
                <TfiCommentAlt className='icon' />
                <span>{post.commentsNo} comments</span>
              </p>
            </div>
          </div>
          <div className='comments'>
            {post.comments.map((comment) => (
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
                  <p> {comment.content}</p>
                </div>
                <div className='post-likes'>
                  <p>
                    <SlLike className='icon' />
                    <span>{post.likes} likes</span>
                  </p>
                  <p>
                    <TfiCommentAlt className='icon' />
                    <span>{post.commentsNo} comments</span>
                  </p>
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
