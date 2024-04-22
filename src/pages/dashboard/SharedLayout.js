import { Outlet } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { useDispatch, useSelector } from 'react-redux'
const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <main className='dashboard'>
        {isSidebarOpen && (
          <div className={isSidebarOpen ? 'small-sidebar' : 'sidebar-none'}>
            <SmallSidebar />
          </div>
        )}
        <div className='big-sidebar '>
          <BigSidebar />
        </div>
        <div className='dashboard-page'>
          <Navbar />
          <div>
            <div className='page-dashboard'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
export default SharedLayout
