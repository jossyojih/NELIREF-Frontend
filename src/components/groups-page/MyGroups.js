import group from '../../assets/images/group-img.png'
import { MdOutlineCheckBox } from 'react-icons/md'
import groupImg from '../../../src/assets/images/group-img.png'

const MyGroups = ({ groups }) => {

  return (
    <article className='all-groups'>
      <section>
        {groups.map((item, index) => (
          <div className='content' key={index}>
            <div className='img'>
              <img src={groupImg} alt={`group-img-${index}`} />
            </div>
            <div>
              <h5>{item.name}</h5>
              <p>{item?.privacy === "public" ? "All" : item.members?.length} Members</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        <button className='member'>
          <MdOutlineCheckBox className='icon' />
          Member
        </button>
      </section>
    </article>
  )
}

export default MyGroups
