import { NavLink } from 'react-router-dom'
import links from '../utils/links'

const NavLinks = () => {
  
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link
        return (
          <div className='nav-link-container' key={id}>
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive ? 'nav-link active' : 'nav-link'
              }}
              key={id}
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}
export default NavLinks
