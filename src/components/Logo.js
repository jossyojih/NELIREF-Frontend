import logo from '../assets/images/Logo.png'
import { useSelector } from 'react-redux'

const Logo = () => {
  const auth_token =
    localStorage.getItem('NELIREF') ||
    (localStorage.getItem('persist:root') &&
      JSON.parse(
        JSON.parse(localStorage.getItem('persist:root')).auth
      )?.token.substring(0, 4))
  console.log(auth_token)
  const baseUrl = 'https://neliref.org/'
  const queryParams = `param1=${auth_token}`

  const newUrl = baseUrl + (baseUrl.includes('?') ? '&' : '?') + queryParams
  console.log(newUrl)

  return (
    <div className='flex-logo'>
      <a href='https://neliref.org/'>
        <img src={logo} alt='jobster logo' width={60} />
      </a>
    </div>
  )
}
export default Logo
