import CreateAccountPage1 from '../components/onboarding-page/CreateAccountPage1'
import { useState } from 'react'
import CompleteProfile from './CompleteProfile'
function Register() {
  const [token, setToken] = useState(null)
  return (
    <div>
      {
        !token ? <CreateAccountPage1
          setAuthToken={setToken}
        /> :
          <CompleteProfile
            auth_token={token}
          />
      }

    </div>
  )
}

export default Register
