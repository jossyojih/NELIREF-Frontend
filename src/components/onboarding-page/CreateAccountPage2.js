import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { type } from '@testing-library/user-event/dist/type';

const CreateAccountPage1 = ({ nextStep, data, setData, type }) => {
  const schema = yup.object().shape({
    full_name: yup.string()
      .required('Full name is Required!'),
    phone: yup
      .string()
      .required('Phone number is required')
      .test('isValidPhoneNumber', 'Invalid phone number', (value) => isValidPhoneNumber(value)),
    user_name: yup.string().required('Username is required'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {

    setData(prev => ({
      ...prev,
      full_name: data.full_name,
      phone: data.phone,
      user_name: data.user_name
    }))
    nextStep()
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='reg-input'>
          <label>Full name</label>
          <div className='input-field'>
            <input type='text'
              placeholder='Enter full name'
              value={data?.full_name}
              {...register('full_name')}
            />
          </div>
          {errors.full_name && (
            <p className='error'>{errors.full_name.message}</p>
          )}
        </div>


        <div>
          <label>Phone number</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={data?.phone}
            onChange={(val) => setValue('phone', val)}
            defaultCountry="NG" // Set the default country (change as needed)
            style={{
              border: '1px solid #ccc', // Add border to the input
              borderRadius: '5px', // Add border-radius for rounded corners
              padding: '1px', // Add padding for better visual appearance
            }}
          />

          {errors.phone && (
            <p className='error'>{errors.phone.message}</p>
          )}
        </div>

        <div className='reg-input'>
          <label>Username</label>
          <div className='input-field'>
            <input
              type='text'
              value={data?.user_name}
              placeholder='Enter your preffered username'
              {...register('user_name')}
            />
          </div>

          {errors.user_name && (
            <p className='error'>{errors.user_name.message}</p>
          )}
        </div>
        <div className='btns'>
          <button type='submit' className='login'>
            Continue <HiOutlineArrowNarrowRight />
          </button>
          {
            type === "login" ?
              <button className='google' onClick={() => window.location.reload(false)}>Cancel</button> :
              <Link to={'/login'}>
                <button className='google'>Cancel</button>
              </Link>
          }

        </div>
      </form>


    </>
  )
}

export default CreateAccountPage1
