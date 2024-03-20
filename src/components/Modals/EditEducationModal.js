import React from 'react'
import GenericModal from './GenericModal'
import Wrapper from '../../assets/wrappers/GroupsModal'
import { CgCloseR } from 'react-icons/cg'
import { useState, useEffect } from 'react'
import SuccessModal from './SuccessModal'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userService from '../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'
import { loginSuccess } from '../../redux/reducers/userReducer'

const EditEducationModal = ({ isOpen, onClose, id, education }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const [formData, setFormData] = useState({})

  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    // Creating educationData from the education prop
    const educationData = {
      school: education?.school,
      degree: education?.degree,
      course: education?.course,
      start: education?.start,
      end: education?.end,
      country: education?.country,
      city: education?.city,
    }

    // Set the form data state
    setFormData(educationData)
  }, [isOpen])

  const validateForm = () => {
    const errors = {}
    // Perform your form validation here
    // For simplicity, let's assume all fields are required
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required'
      }
    })
    return errors
  }

  const mutation = useMutation({
    mutationFn: (params, data) => userService.updateEducation(id, formData),
    onSuccess: (data) => {
      dispatch(loginSuccess(data?.user))
      setIsSuccessModalOpen(true)

      toast.success('Education update successfully')
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error)

      toast.error(error)
      toast.error(error?.message)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length === 0) {
      setFormErrors({})
      // If there are no validation errors, submit the form
      mutation.mutate(formData)
    } else {
      // If there are validation errors, set them in the state
      setFormErrors(validationErrors)
    }
  }

  const openSuccessModal = (e) => {
    e.preventDefault()
    setIsSuccessModalOpen(true)
  }
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
    onClose()
  }
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <div className='heading'>
          <h3>Edit Education</h3>
          <CgCloseR onClick={onClose} className='icon' />
        </div>

        <form onSubmit={handleSubmit}>
          <p>
            <span className='asterix'>*</span> indicates fields that are
            compulsory.
          </p>
          <div>
            <label>
              School <span className='asterix'>*</span>
            </label>
            <input
              name='school'
              type='text'
              value={formData?.school}
              placeholder='Enter name of school'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors?.school}</p>
          </div>
          <div>
            <label>
              Degree <span className='asterix'>*</span>
            </label>
            <input
              name='degree'
              value={formData?.degree}
              type='text'
              placeholder='Enter degree'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors?.degree}</p>
          </div>
          <div>
            <label>Course/Field of study</label>
            <input
              type='text'
              value={formData?.course}
              name='course'
              placeholder='Course/Field of study'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.course}</p>
          </div>

          <div>
            <label>
              Start date <span className='asterix'>*</span>
            </label>
            <input
              type='date'
              name='start'
              value={formData?.start}
              placeholder='start date'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.start}</p>
          </div>
          <div>
            <label>
              End date (or expected graduation){' '}
              <span className='asterix'>*</span>
            </label>
            <input
              type='date'
              name='end'
              value={formData?.end}
              placeholder='select date'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.end}</p>
          </div>
          <div>
            <label>
              Country <span className='asterix'>*</span>
            </label>
            <input
              type='text'
              name='country'
              value={formData?.country}
              placeholder='Enter Country'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.country}</p>
          </div>
          <div>
            <label>
              City <span className='asterix'>*</span>
            </label>
            <input
              type='text'
              name='city'
              placeholder='Enter city'
              value={formData?.city}
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.city}</p>
          </div>
          <div className='btn'>
            <button type='submit'>
              {mutation.isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20}
                />
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </form>
        {isSuccessModalOpen ? (
          <SuccessModal onClose={closeSuccessModal} />
        ) : null}
      </Wrapper>
    </GenericModal>
  )
}

export default EditEducationModal
