import { useEffect, useState } from 'react'
import Wrapper from '../../assets/wrappers/Members'
import { BsGrid } from 'react-icons/bs'
import { HiBars3 } from 'react-icons/hi2'
import MyGroups from '../../components/groups-page/MyGroups'
import AllMembers from '../../components/members-page/AllMembers'
import MyConnections from '../../components/members-page/MyConnections'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import { useSelector } from 'react-redux';

const Members = () => {
  const [activeTab, setActiveTab] = useState('all-members')
  const { connections } = useSelector((store) => store.user);
  const [myConnections, setMyConnections] = useState([])

  const members = useQuery({
    queryKey: ['get-members'],
    queryFn: user.getMembers,
  })

  const totalMembers = members?.data?.members.reduce(
    (sum) => sum + 1,
    0
  )

  useEffect(() => {

    if (connections?.length > 0) {
      setMyConnections(members?.data?.members.filter(member => connections.some(item => (item.user === member._id && item.status === "connected"))))
    }
    return () => { }
  }, [members?.data?.members])

  return (
    <Wrapper>
      <article className='tab-content'>
        <h2>Members</h2>
      </article>

      <article className='members-container'>
        <section className='tabs'>
          <div className='groups'>
            <div
              onClick={() => setActiveTab('all-members')}
              className={`tab-btn ${activeTab === 'all-members' ? 'active' : ''
                }`}
            >
              <h4>
                All Members <span className='number'>{totalMembers}</span>
              </h4>
            </div>
            <div
              onClick={() => setActiveTab('my-connections')}
              className={`tab-btn ${activeTab === 'my-connections' ? 'active' : ''
                }`}
            >
              <h4>
                My Connections <span className='number-grey'> {connections?.filter(item => item.status === "connected")?.length}</span>
              </h4>
            </div>
          </div>
          <div className='displays'>
            <div>
              <BsGrid />
            </div>
            <div>
              <HiBars3 className='bars' />
            </div>
          </div>
        </section>

        <section>
          {activeTab === 'all-members' && <AllMembers members={members} />}
          {activeTab === 'my-connections' && <MyConnections connections={myConnections} />}
        </section>
       
      </article>
    </Wrapper>
  )
}

export default Members
