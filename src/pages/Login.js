import main from '../assets/images/main.png'
import logo from '../assets/images/Logo.png'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { RotatingLines } from 'react-loader-spinner'
import auth from '../services/api/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/reducers/jwtReducer'
import { loginSuccess } from '../redux/reducers/userReducer'
import GoogleLoginButton from '../components/onboarding-page/GoogleLoginButton'
import CompleteProfile from './CompleteProfile'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passwordShown, setPasswordShown] = useState(false)
  const [showProfile, setShowProfile] = useState(null)

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev)
  }

  const schema = yup.object().shape({
    email: yup.string().required('Your Full Name is Required!'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: auth.login,
    onSuccess: (data) => {
      // Handle successful login
      // toast?.clear()
      toast.success(data.message)
      if (data.status === 'redirect') {
        return setShowProfile(data.token)
      }

      localStorage.setItem('NELIREF', data?.token)
      dispatch(loginSuccess(data?.user))
      dispatch(setToken(data?.token))
      navigate('/', { replace: true })
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error)

      toast.error(error)
      toast.error(error?.message)
    },
  })

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    mutation.mutate(data)
  }

  return (
    <>
      {!showProfile ? (
        <Wrapper>
          <article className='register-login-container'>
            <article className='hero-img-container'>
              <img src={main} alt='hero-img' />
            </article>
            <article>
              <section className='logo-container'>
                <div className='logo'>
                  <img src={logo} alt='logo' />
                </div>
                <h5>NELIREF</h5>
              </section>
              <section>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='reg-input'>
                    <label>Email/Username</label>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Email, username, or phone number'
                        {...register('email')}
                      />
                    </div>
                    <p className='error'>{errors.email?.message}</p>
                  </div>

                  <div className='reg-input'>
                    <label>Password</label>
                    <div className='password-field'>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        placeholder='*********'
                        {...register('password')}
                      />
                      <div
                        className='margin-o'
                        onClick={togglePasswordVisibility}
                      >
                        {passwordShown ? (
                          <AiOutlineEye className='icon' />
                        ) : (
                          <AiOutlineEyeInvisible className='icon' />
                        )}
                      </div>
                    </div>
                    <p className='error'>{errors.password?.message}</p>
                  </div>
                  <Link to={'/reset-password'}>Forgot Password?</Link>
                  <div className='btns'>
                    <button
                      type='submit'
                      className='login'
                      disabled={mutation?.isPending}
                    >
                      {mutation.isPending ? (
                        <RotatingLines
                          type='Oval'
                          style={{ color: '#FFF' }}
                          height={20}
                          width={20}
                        />
                      ) : (
                        <>
                          Login <HiOutlineArrowNarrowRight />
                        </>
                      )}
                    </button>
                    <GoogleLoginButton setShowProfile={setShowProfile} />
                  </div>
                  <p className='register-link'>
                    Don't have an account?{' '}
                    <Link to={'/register'}>Get started</Link>
                  </p>
                </form>
              </section>
            </article>
          </article>
        </Wrapper>
      ) : (
        <CompleteProfile type='login' auth_token={showProfile} />
      )}
    </>
  )
}

export default Login
