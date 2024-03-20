import React from 'react'
import GenericModal from './GenericModal'
import Wrapper from '../../assets/wrappers/GroupsModal'
import { CgCloseR } from 'react-icons/cg'
import { useState } from 'react'
import SuccessModal from './SuccessModal'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userService from '../../services/api/user'
import { loginSuccess } from '../../redux/reducers/userReducer'
import { RotatingLines } from 'react-loader-spinner'

const AddEducationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const { education, setEducation } = useState({})
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    course: '',
    start: '',
    end: '',
    country: '',
    city: '',
  })

  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

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
    mutationFn: userService.addEducation,
    onSuccess: (data) => {
      // Handle successful login
      dispatch(loginSuccess(data?.user))
      setIsSuccessModalOpen(true)
      toast.success('Education Added')
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
          <h3>Add Education</h3>
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
              placeholder='Enter name of school'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.school}</p>
          </div>
          <div>
            <label>
              Degree <span className='asterix'>*</span>
            </label>
            <input
              name='degree'
              type='text'
              placeholder='Enter degree'
              onChange={handleInputChange}
            />
            <p className='error'>{formErrors.degree}</p>
          </div>
          <div>
            <label>Course/Field of study</label>
            <input
              type='text'
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

export default AddEducationModal
