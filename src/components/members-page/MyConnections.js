import emptystate from '../../assets/images/empty-state.png'
import MemberCard from './MemberCard'

const MyConnections = ({ connections }) => {

  return (
    <article className='forums'>
      {connections?.length === 0 ? (
        <article className='all-groups none'>
          <div className='no-forum-container'>
            <div className='no-forum'>
              <img src={emptystate} alt='no-forums' />
            </div>
            <p>You have no connections yet</p>
            <p>
              Make connections from <span className='all-members'>All Members</span>
            </p>
          </div>
        </article>
      ) : (
        <article className='all-groups'>
          {
            connections?.map(member => (
              <MemberCard key={member._id} member={member} />
            ))
          }

        </article>
      )}
    </article>
  )
}

export default MyConnections
