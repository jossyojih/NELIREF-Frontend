import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-phone-number-input/style.css';

const CreateAccountPage3 = ({ prevStep, data, setData, openConfirmModal }) => {
  const schema = yup.object().shape({
    level_of_education: yup.string().required('Level of education is required'),
    date_of_birth: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
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
    setData((prev) => ({
      ...prev,
      education_level: data.level_of_education,
      DOB: data.date_of_birth,
      gender: data.gender,
    }));
    openConfirmModal()
    // nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='reg-input'>
          <label>Level of education</label>
          <select {...register('level_of_education')} value={data?.education_level}>
            <option value=''>-- Select Education --</option>
            <option value='None'>No previous qualification</option>
            <option value='SSCE'>High school/ SSCE</option>
            <option value='Diploma'>College/ Diploma</option>
            <option value='BSc'>BSc</option>
            <option value='MSc'>MSc</option>
            <option value='PhD'>PhD</option>
          </select>
          {errors.level_of_education && (
            <p className='error'>{errors.level_of_education.message}</p>
          )}
        </div>

        <div className='reg-input'>
          <label>Date of birth</label>
          <input type='date' placeholder='Date of birth' value={data?.DOB} {...register('date_of_birth')} />
          {errors.date_of_birth && (
            <p className='error'>{errors.date_of_birth.message}</p>
          )}
        </div>

        <div className='reg-input'>
          <label>Gender</label>
          <select {...register('gender')} value={data?.gender}>
            <option value=''>-- Select Gender --</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.gender && <p className='error'>{errors.gender.message}</p>}
        </div>

        <div className='btns'>
          <button type='submit' className='login'>
            Continue <HiOutlineArrowNarrowRight />
          </button>

          <button type='button' onClick={prevStep} className='google'>
            Previous
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAccountPage3;
