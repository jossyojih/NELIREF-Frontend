import React, { useState, useEffect, useRef } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import profile from '../assets/images/profile.png'
import { BsBell } from 'react-icons/bs'
import { CiMail } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { SlArrowDown } from 'react-icons/sl'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess, toggleSidebar } from '../redux/reducers/userReducer'
import { clearToken } from '../redux/reducers/jwtReducer'
import { CiMenuFries } from 'react-icons/ci'


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [navOpen, setNavOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { isSidebarOpen } = useSelector((store) => store.user)

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  const dropdownClick = () => {
    setNavOpen(!navOpen)
  }

  const closeDropdown = () => {
    setNavOpen(false)
  }

  console.log(isSidebarOpen)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown()
      }
    }

    if (navOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navOpen])

  const logOut = () => {
    dispatch(logoutSuccess())
    dispatch(clearToken())
    navigate('/login', { replace: true })
  }

  return (
    <Wrapper>
      <div className='menu-icon' onClick={toggle}>
        <CiMenuFries />
      </div>
      <div className='search'>
        <CiSearch className='search-icon' />
        <input type='text' placeholder='search' />
      </div>
      <div className='nav-icons'>
        <Link to={'/notifications'}>
          <BsBell className='icon' />
        </Link>
        <Link to={'/messages'}>
          <CiMail className='icon' />
        </Link>

        <div className='profile-info'>
          <img
            src={user?.photo || profile}
            width={34}
            alt='profile'
            className='profile'
          />
          <div>
            <SlArrowDown className='drop-down' onClick={dropdownClick} />
          </div>
        </div>

        {navOpen ? (
          <section className='nav-dropdown' ref={dropdownRef}>
            <div className='profile-content'>
              <img
                className='profile-img'
                src={user?.photo || profile}
                alt=''
              />
              <div>
                <h5>{user?.full_name}</h5>
                <p>@{user?.user_name}</p>
              </div>
            </div>

            <Link to={'/profile'}>
              <button>View my profile</button>
            </Link>

            <button>Help</button>
            <button>Language</button>
            <button onClick={logOut}>Sign out</button>
          </section>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default Navbar
