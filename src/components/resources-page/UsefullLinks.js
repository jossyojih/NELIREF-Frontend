import { HiLink } from 'react-icons/hi'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import SkeletonArticle from '../skeletons/SkeletonArticle'

const UsefullLinks = () => {
  const getLinks = useQuery({
    queryKey: ['get-usefull-links'],
    queryFn: user.getUsefullLinks,
  })

  const links = getLinks?.data?.links

  return (
    <section className='tcontainer-wrapper bg-white'>
      {getLinks.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <>
          {links?.map((link, index) => (
            <div key={index} className='usefull-links'>
              <div>
                <HiLink />
              </div>
              <a
                href={
                  link.url.startsWith('https://')
                    ? link.url
                    : `https://${link.url}`
                }
                target='blank'
              >
                {link.url}
              </a>
            </div>
          ))}
        </>
      )}

      {getLinks.isError && <p>An Error Occured</p>}
    </section>
  )
}

export default UsefullLinks
