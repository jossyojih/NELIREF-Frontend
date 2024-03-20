import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoMdClose } from 'react-icons/io'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import user from '../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'
import { FaPlus } from 'react-icons/fa6'

const MakePostModal = ({ onClose, message }) => {
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
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('group1') // default value for Category 1
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [summary, setSummary] = useState('')

  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.files[0])
  }

  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/i

  const handleEventUpload = async (e) => {
    e.preventDefault()

    if (!title) {
      toast.error('Title is required.')
      return
    }

    if (!category) {
      toast.error('Category is required.')
      return
    }

    if (!eventDate) {
      toast.error('Event date is required.')
      return
    }

    if (!timeRegex.test(startTime)) {
      toast.error('Invalid start time format. Please use HH:mmam/pm.')
      return
    }

    if (!timeRegex.test(endTime)) {
      toast.error('Invalid end time format. Please use HH:mmam/pm.')
      return
    }

    if (!summary) {
      toast.error('Summary is required.')
      return
    }

    if (!selectedDocument) {
      toast.error('Please select a document.')
      return
    }
    if (selectedDocument) {
      const formData = new FormData()
      formData.append('image', selectedDocument)
      formData.append('title', title)
      formData.append('type', category)
      formData.append('eventDate', eventDate)
      formData.append('startTime', startTime)
      formData.append('endTime', endTime)
      formData.append('summary', summary)

      try {
        await eventMutation.mutateAsync(formData)
        setSelectedDocument(null)
        onClose()
        // Reset selected file after upload
      } catch (error) {
        console.log(error)
      }
    }
  }

  const eventMutation = useMutation({
    mutationFn: user.uploadEvents,
    queryKey: ['get-upload-events'],
    onSuccess: (data) => {
      toast.success('Document uploaded successfully')
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error(error?.message || 'An error occurred during document upload')
    },
  })

  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = (event) => {
    const files = event.target.files
    setSelectedFiles([...selectedFiles, ...files])
  }

  return (
    <Wrapper style={modalStyle}>
      <div style={contentStyle}>
        <div className='heading'>
          <h3>Make a post </h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleEventUpload}>
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
              {selectedFiles.map((file, index) => (
                <div key={index} className='img-width'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    width='100'
                  />
                </div>
              ))}
            </div>
            <div class='custom-file-upload mul-file'>
              <FaPlus />
              <input
                type='file'
                id='upload'
                multiple
                onChange={handleFileChange}
              />
              <label for='upload'>Add photo</label>
            </div>
          </div>

          <button className='action-btn' type='sumbit'>
            {eventMutation.isPending ? (
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
