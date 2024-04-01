import NavLinks from './NavLinks'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../redux/reducers/userReducer'
import { TfiClose } from 'react-icons/tfi'

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div>
        <div>
          <header>
            <Logo />
            <div className='menu-icon-two' onClick={toggle}>
              <TfiClose />
            </div>
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar
