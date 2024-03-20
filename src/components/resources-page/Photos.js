import photo from '../../assets/images/photo.png'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import SkeletonArticle from '../skeletons/SkeletonArticle'

const Photos = () => {
  const getPhotos = useQuery({
    queryKey: ['get-photos'],
    queryFn: user.getPhotos,
  })
  const photos = getPhotos?.data?.photos
  console.log(photos)

  return (
    <article className='tcontainer-wrapper photo'>
      {getPhotos.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <div>
          <section className='photo-grid'>
            {photos?.map((photo, index) => (
              <div key={index}>
                <img src={photo.file.url} alt={`picture-${index}`} />
              </div>
            ))}
          </section>
          <div className='tbtn-container'>
            <button className='btn-primary load-more'>Load More</button>
          </div>
        </div>
      )}
      {getPhotos.isError && <p>An Error Occured</p>}
    </article>
  )
}

export default Photos
