import photo from '../../assets/images/photo.png'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { useState, useEffect } from 'react'

const Photos = () => {
  const [itemsToShow, setItemsToShow] = useState(4)
  const getPhotos = useQuery({
    queryKey: ['get-photos'],
    queryFn: user.getPhotos,
  })
  const photos = getPhotos?.data?.photos
  const data = getPhotos?.data?.photos?.slice(0, itemsToShow)
  console.log(photos)
  const handleLoadMore = () => {
    setItemsToShow((prevCount) => prevCount + 4) // Increment itemsToShow by 4
  }

  useEffect(() => {
    if (
      !getPhotos.isLoading &&
      !getPhotos.isError &&
      data?.length === getPhotos?.data?.photos?.length
    ) {
      setItemsToShow(getPhotos?.data?.photos?.length)
    }
  }, [getPhotos, data])

  return (
    <article className='tcontainer-wrapper photo'>
      {getPhotos.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <div>
          <section className='photo-grid'>
            {data?.map((photo, index) => (
              <div key={index}>
                <img
                  className='img-photo'
                  src={photo.file.url}
                  alt={`picture-${index}`}
                />
              </div>
            ))}
          </section>
          <div className='tbtn-container'>
            <button className='btn-primary load-more' onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        </div>
      )}
      {getPhotos.isError && <p>An Error Occured</p>}
    </article>
  )
}

export default Photos
