import React from 'react'
import profileImg from '../../assets/images/profile.png'
import { TbUserPlus } from 'react-icons/tb'
import { CiMenuKebab } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import SkeletonArticle from '../../components/skeletons/SkeletonArticle'

const GroupMembers = ({ members }) => {
  const { user } = useSelector((store) => store.user)
  const isAdmin = members.some(
    (item) => item?.user?._id === user._id && item?.isAdmin
  )
  const pendingMembers = members.filter((item) => item.status === 'pending')

  return (
    <div className='post'>
      {pendingMembers.length > 0 && isAdmin
        ? [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        : members?.map((item, index) => {
            if (item.status === 'pending' && isAdmin) {
              return (
                <div key={index} className='list-wrapper'>
                  <div className='list-card'>
                    <div className='img-wrapper'>
                      <img src={item?.user?.photo || profileImg} alt='' />
                    </div>
                    <h2 className='head'>{item?.user?.full_name}</h2>
                    {/* <p className='role'>{item?.isAdmin ? "Admin" : "Member"}</p> */}
                  </div>
                  <div className='icons'>
                    <TbUserPlus />
                    <CiMenuKebab />
                  </div>
                </div>
              )
            } else if (item?.status === 'approved') {
              return (
                <div key={index} className='list-wrapper'>
                  <div className='list-card'>
                    <div className='img-wrapper'>
                      <img src={item?.user?.photo || profileImg} alt='' />
                    </div>
                    <h2 className='head'>{item?.user?.full_name}</h2>
                    <p className='role'>{item?.isAdmin ? 'Admin' : 'Member'}</p>
                  </div>
                  <div className='icons'>
                    <TbUserPlus />
                    <CiMenuKebab />
                  </div>
                </div>
              )
            }
            return null // Handle other cases or return null
          })}
    </div>
  )
}

export default GroupMembers
