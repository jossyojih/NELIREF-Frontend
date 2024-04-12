import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoMdClose } from 'react-icons/io'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import user from '../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'
import { FaPlus } from 'react-icons/fa6'

const MakePostModal = ({ onClose, message, id }) => {
  const modalStyle = {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }

  const contentStyle = {
    backgroundColor: 'white',
    width: '35%',
    height: '400px',
    margin: 'auto',
    marginTop: '2%',

    borderRadius: '5px',
    padding: '1.5rem',
  }

  const [summary, setSummary] = useState('')
  const [selectedFiles, setSelectedFiles] = useState(null)
  console.log(selectedFiles)
  const mutation = useMutation({
    mutationFn: ({ formData, params }) => user.makeGroupPost(params, formData),
    queryKey: ['get-posts'],
    onSuccess: (data) => {
      toast.success('Post created successfully')
      onClose()
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error(error?.message || 'An error occurred during post creation')
    },
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFiles(file)
  }

  const handleMakePost = async (e) => {
    e.preventDefault()

    if (!summary) {
      toast.error('Summary is required.')
      return
    }

    if (!selectedFiles) {
      toast.error('Please select a document.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFiles)
    formData.append('message', summary)

    try {
      await mutation.mutateAsync({
        formData,
        params: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  console.log(id)

  return (
    <Wrapper style={modalStyle}>
      <div className='content-style'>
        <div className='heading'>
          <h3>Make a post </h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleMakePost}>
          <label className='summary-text'>
            <p>Share your thoughts</p>
            <textarea
              type='text'
              placeholder='Write here'
              className='thought'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
          <div className='img-wrapper-flex'>
            <div className='img-flex'>
              {selectedFiles && (
                <div className='img-width'>
                  <img
                    src={URL.createObjectURL(selectedFiles)}
                    alt={`Selected Image`}
                    width='100'
                  />
                </div>
              )}
            </div>
            <div className='custom-file-upload mul-file'>
              <FaPlus />
              <input type='file' id='upload' onChange={handleFileChange} />
              <label htmlFor='upload'>Add photo</label>
            </div>
          </div>

          <button className='action-btn' type='submit'>
            {mutation.isPending ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#fff' }}
                height={20}
                width={20}
              />
            ) : (
              <>Send post</>
            )}
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

export default MakePostModal
