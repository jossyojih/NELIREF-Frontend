import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { BsThreeDots } from 'react-icons/bs'
import profile from '../../assets/images/profile.png'

const MyActivity = () => {
  return (
    <div className='bg-container'>
      <div className='activities'>
        <div className='profile-img'>
          <img src={profile} alt='profile' className='profile' />
        </div>

        <div>
          <div className='time-name'>
            <p>
              <span className='name'>Gabriel Joseph </span>
            </p>
            <p className='time'>46 mins ago</p>
          </div>
          <p className='desc'>
            Education would be much more easier if issues with funds were
            solved, I believe in a more educated Africa{' '}
          </p>
          <div className='icons'>
            <p className='social-btns-flex'>
              <SlLike className='icon sm' /> Like
            </p>
            <p className='social-btns-flex'>
              <TfiCommentAlt className='icon sm' /> Comment
            </p>
          </div>
        </div>
        <BsThreeDots className='icon' />
      </div>
    </div>
  )
}

export default MyActivity
