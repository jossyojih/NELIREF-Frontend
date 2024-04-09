import React, { useEffect, useState } from 'react'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'
import MemberCard from './MemberCard'
import { useSelector } from 'react-redux'

const AllMembers = ({ members }) => {
  const { user } = useSelector((store) => store.user)
  const [userData, setUserData] = useState([])
  const [otherMembers, setOtherMembers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  useEffect(() => {
    const updateMembersData = () => {
      const updatedMembers = members?.data?.members && [
        ...members?.data?.members,
      ]
      const indexToRemove = updatedMembers?.findIndex(
        (obj) => obj?._id === user?._id
      )

      if (indexToRemove !== -1) {
        const removedUser = updatedMembers?.splice(indexToRemove, 1)[0]
        setUserData([removedUser])
        setOtherMembers(updatedMembers)
      } else {
        setUserData([])
        setOtherMembers(members?.data?.members || [])
      }
    }

    updateMembersData()
  }, [members?.data?.members, user?._id])

  // Calculate pagination data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMembers = otherMembers?.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <article className='all-groups'>
      {members?.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <>
          {userData?.length > 0 &&
            userData.map((user) => (
              <MemberCard key={user?._id} member={user} isMe={true} />
            ))}

          {currentMembers?.length > 0 &&
            currentMembers.map((member) => (
              <MemberCard key={member?._id} member={member} />
            ))}
        </>
      )}
      <section className='pagination'>
        <p>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, otherMembers?.length)} of{' '}
          {otherMembers?.length} members
        </p>

        <div className='pagination-btns'>
          {Array.from(
            { length: Math.ceil(otherMembers?.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className='next-btn'
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(otherMembers?.length / itemsPerPage)
            }
          >
            {'>'}
          </button>
        </div>
      </section>
    </article>
  )
}

export default AllMembers
