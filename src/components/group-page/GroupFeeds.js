import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import userServices from '../../services/api/user'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'
import { toast } from 'react-toastify'
import PostCard from '../../components/feed-page/Postcard'

const GroupFeeds = ({ id }) => {
  const queryClient = useQueryClient()

  const getGroupPosts = useQuery({
    queryKey: ['get-group-posts', id],
    queryFn: () => userServices.getGroupPost(id),
  })

  const groupPost = getGroupPosts?.data?.posts
  const [displayCount, setDisplayCount] = useState(2) // Initial display count

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 3) // Increase display count by 3
  }

  console.log(getGroupPosts)

  return (
    <div className='app'>
      {getGroupPosts.isLoading
        ? [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        : groupPost
            ?.slice(0, displayCount)
            .map((post) => <PostCard key={post._id} post={post} />)}
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
