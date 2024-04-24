import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { loginSuccess } from '../../redux/reducers/userReducer'
import user from '../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'

const AddUsefulLinks = ({ onClose, message }) => {
  const queryClient = useQueryClient()
  const modalStyle = {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1222,
  }

  const contentStyle = {
    backgroundColor: 'white',
    width: '30%',
    margin: 'auto',
    marginTop: '5%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
  }

  const [formData, setFormData] = useState({
    title: '',
    url: '',
  })

  console.log(formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const mutation = useMutation({
    mutationFn: user.uploadUsefullLinks,
    queryKey: ['get-usefull-links'],
    onSuccess: (data) => {
      toast.success('Link Added')
      queryClient.invalidateQueries(['get-usefull-links'])
    },
    onError: (error) => {
      toast.error(error)
      toast.error(error?.message)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.url) {
      toast.error('Url is required')
      return
    }
    if (!formData.title) {
      toast.error('Title is required')
      return
    }
    // If there are no validation errors, submit the form

    try {
      await mutation.mutate(formData)
      // Reset selected file after upload
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper style={modalStyle}>
      <div className='content-style'>
        <div className='heading'>
          <h3>Add Link</h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Title of Link
            <input
              type='text'
              placeholder='Enter title here'
              name='title'
              onChange={handleInputChange}
            />
          </label>
          <label>
            Enter URL
            <input
              type='text'
              placeholder='Enter URL'
              name='url'
              onChange={handleInputChange}
            />
          </label>

          <button className='action-btn' type='submit'>
            {mutation.isPending ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#fff' }}
                height={20}
                width={20}
              />
            ) : (
              <>Upload Link</>
            )}
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

export default AddUsefulLinks
