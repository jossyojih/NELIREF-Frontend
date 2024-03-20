import { HiOutlineHome } from 'react-icons/hi'
import { RiTeamLine } from 'react-icons/ri'
import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { SlCalender } from 'react-icons/sl'
import { BsGrid } from 'react-icons/bs'
import { RiShieldUserLine } from 'react-icons/ri'

const links = [
  { id: 1, text: 'Feeds', path: '/', icon: <HiOutlineHome /> },
  {
    id: 2,
    text: 'Resources',
    path: 'resources',
    icon: <BsGrid />,
  },
  { id: 3, text: 'Groups', path: 'groups', icon: <AiOutlineTeam /> },
  { id: 4, text: 'Forum', path: 'forum', icon: <RiTeamLine /> },
  { id: 5, text: 'Events', path: 'events', icon: <SlCalender /> },
  { id: 6, text: 'Members', path: 'members', icon: <RiShieldUserLine /> },
  {
    id: 7,
    text: 'Fundings',
    path: 'fundings',
    icon: <AiOutlineDollarCircle />,
  },
]

export default links
