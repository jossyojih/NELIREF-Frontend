import main from '../../assets/images/main.png'
import logo from '../../assets/images/Logo.png'
import Wrapper from '../../assets/wrappers/RegisterPage'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import GoogleLoginButton from './GoogleLoginButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { RotatingLines } from 'react-loader-spinner';
import auth from '../../services/api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateAccountPage1 = ({ setAuthToken }) => {
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown)
  }

  const schema = yup.object().shape({
    email: yup.string()
      .email("Invalid Email")
      .required('Email is Required!'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Validation rule for matching passwords
      .required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: auth.register,
    onSuccess: (data) => {
      // Handle successful login
      console.log('Registration successful:', data);
      toast.success(data.message)
      // dispatch(setToken(data?.token));
      setAuthToken(data.token)

    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error);
      toast.error(error)
      toast.error(error?.message)
      navigate("/login")
    },
  });

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    // console.log(data)
    mutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <Wrapper>
      <article className='register-login-container'>
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
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Email</label>
                <div className='input-field'>
                  <input
                    type='text'
                    placeholder='Enter email'
                    {...register('email')}
                  />
                </div>
                <p className='error'>{errors.email?.message}</p>
              </div>

              <div>
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
              <div>
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

              <p>Forgort Password?</p>
              <div className='btns'>

                <button className='login' disabled={mutation?.isPending}>
                  {mutation.isPending ? (
                    <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} />
                  ) : (
                    <>
                      Create an account <HiOutlineArrowNarrowRight />
                    </>

                  )}

                </button>
                <GoogleLoginButton
                  setShowProfile={setAuthToken} />
              </div>
            </form>

          </section>
          <p className='policy'>
            Continuing means you agree to our terms of use and privacy policy
          </p>
          <p className='signin'>
            Already have an account? <Link to={"/login"}> Sign in</Link>
          </p>
        </article>
      </article>
    </Wrapper>
  )
}

export default CreateAccountPage1
