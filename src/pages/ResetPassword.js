import main from '../assets/images/main.jpeg'
import logo from '../assets/images/Logo.png'
import Wrapper from '../assets/wrappers/RegisterPage'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import auth from '../services/api/auth'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import EmailConfirmationModal from '../components/Modals/EmailConfirmationModal'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/reducers/jwtReducer'

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }

  const closeSuccessModal = () => {
    setIsConfirmModalOpen(false)
    // onClose()
  }

  useEffect(() => {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const resetToken = urlParams.get('t')
    const queryCode = urlParams.get('c')

    if (resetToken && queryCode) {
      mutate({ auth_token: resetToken, token: queryCode })
      dispatch(setToken(resetToken))
    } else {
      setOpen(true)
    }
  }, [])

  const schema = yup.object().shape({
    email: yup.string().required('Enter a valid email'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: auth.resetPassword,
    onSuccess: (data) => {
      // Handle successful login
      openConfirmModal()
      console.log(data.data.message)
    },
    onError: (error) => {
      // Handle login error
      console.error('error:', error)

      toast.error(error)
      toast.error(error?.message)
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: auth.confirmToken,
    onSuccess: (data) => {
      // Handle successful login
      navigate('/new-password', { replace: true })

      // const newUrl = window.location.origin + window.location.pathname
      // window.history.replaceState({}, document.title, newUrl)
    },
    onError: (error) => {
      // Handle login error
      navigate('/login', { replace: true })

      toast.error(error)
      toast.error(error?.message)
    },
  })

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    mutation.mutate(data)
    //
  }

  return (
    <>
      <Wrapper>
        {open && (
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
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='reg-input'>
                    <label>Email</label>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Email, username, or phone number'
                        {...register('email')}
                      />
                    </div>
                    <p className='error'>{errors.email?.message}</p>
                  </div>

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
                          Send <HiOutlineArrowNarrowRight />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </section>
            </article>
          </article>
        )}
      </Wrapper>
      {isConfirmModalOpen && (
        <EmailConfirmationModal onClose={closeSuccessModal} />
      )}
    </>
  )
}

export default ResetPassword
