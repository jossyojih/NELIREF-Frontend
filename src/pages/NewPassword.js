import main from '../assets/images/main.png'
import logo from '../assets/images/Logo.png'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import auth from '../services/api/auth'

const CreateAccountPage1 = ({ setAuthToken }) => {
  const navigate = useNavigate()

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown)
  }

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Validation rule for matching passwords
      .required('Confirm Password is required'),
  })

  const mutation = useMutation({
    mutationFn: auth.newPassword,
    onSuccess: (data) => {
      navigate('/login', { replace: true })
      toast.success('You have successfully reset your password')
    },
    onError: (error) => {
      // Handle login error
      console.error('error:', error)

      toast.error(error)
      toast.error(error?.message)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    // console.log(data)
    mutation.mutate(data)
  }

  return (
    <Wrapper>
      <article className='register-login-container new-password'>
        <article>
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
            <h2>Enter New Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='new-pword-label'>
                <label>Password</label>
                <div className='password-field'>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='*********'
                    {...register('password')}
                  />
                  <div className='margin-o' onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <AiOutlineEye className='icon' />
                    ) : (
                      <AiOutlineEyeInvisible className='icon' />
                    )}
                  </div>
                </div>
                <p className='error'>{errors.password?.message}</p>
              </div>
              <div className='new-pword-label'>
                <label>Confirm password</label>
                <div className='password-field'>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='*********'
                    {...register('confirmPassword')}
                  />
                  <div className='margin-o' onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <AiOutlineEye className='icon' />
                    ) : (
                      <AiOutlineEyeInvisible className='icon' />
                    )}
                  </div>
                </div>

                {errors.confirmPassword && (
                  <p className='error'>{errors.confirmPassword.message}</p>
                )}
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
                      Reset Password <HiOutlineArrowNarrowRight />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </article>
      </article>
    </Wrapper>
  )
}

export default CreateAccountPage1
