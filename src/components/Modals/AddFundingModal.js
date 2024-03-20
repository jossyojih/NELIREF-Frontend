import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { MdInsertPhoto } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import user from '../../services/api/user'
import { MdPhoto } from 'react-icons/md'
import { RotatingLines } from 'react-loader-spinner'

const AddFundingModal = ({ onClose, message }) => {
  const queryClient = useQueryClient();
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
    width: '30%',
    margin: 'auto',
    marginTop: '2%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
  }

  const [documentTitle, setDocumentTitle] = useState('')
  const [selecteDocument, setSelectedDocument] = useState(null)
  const [summaryValue, setSummaryValue] = useState('')

  const [urlValue, setUrlValue] = useState('')

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value)
  }

  const handleSummaryChange = (event) => {
    setSummaryValue(event.target.value)
  }

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.files[0])
  }

  const handleDocumentTitleChange = (event) => {
    setDocumentTitle(event.target.value)
  }

  const handleDocumentUpload = async (e) => {
    e.preventDefault()
    const titleRegex = /^.+$/ // Allow any character, 1-255 characters
    const titleIsValid = titleRegex.test(documentTitle)
    if (!titleIsValid) {
      toast.error('Invalid document title')
      return
    }
    if (!urlValue) {
      toast.error('Please enter URL')
      return
    }
    if (!selecteDocument) {
      if (!window.confirm("No image selected. Click Ok to continue.")) return
    }

    if (!summaryValue) {
      toast.error('Please enter summary')
      return
    }
    let formData;

    if (selecteDocument) {
      formData = new FormData()
      formData.append('image', selecteDocument)
      formData.append('title', documentTitle)
      formData.append('summary', summaryValue)
      formData.append('url', urlValue)
    } else {
      formData = {
        title: documentTitle,
        summary: summaryValue,
        url: urlValue
      }
    }

    try {
      documentMutation.mutate(formData)
      setSelectedDocument(null) // Reset selected file after upload
      onClose()
    } catch (error) {
      console.log(error)
    }
  }


  const documentMutation = useMutation({
    mutationFn: selecteDocument ? user.addFundings : user.addFundingsWithoutImage,
    onSuccess: (data) => {
      toast.success('Funding uploaded successfully')
      queryClient.invalidateQueries(['get-fundings']);
      onClose()
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error(error?.message || 'An error occurred during document upload')
    },
  })

  return (
    <Wrapper style={modalStyle}>
      <div style={contentStyle}>
        <div className='heading'>
          <h3>Add Funding</h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <form onSubmit={handleDocumentUpload}>
          <label>
            Title of Funding
            <input
              type='text'
              placeholder='Enter title here'
              value={documentTitle}
              onChange={handleDocumentTitleChange}
            />
          </label>
          <label>
            Summary of Funding
            <textarea
              name='summary'
              id='summary'
              cols='30'
              rows='4'
              placeholder='Write summary here'
              value={summaryValue}
              onChange={handleSummaryChange}
            ></textarea>
          </label>

          <label>
            Link to Funding
            <input
              type='text'
              id='urlInput'
              name='urlInput'
              placeholder='Type url'
              value={urlValue}
              onChange={handleUrlChange}
            />
          </label>

          <div class='custom-file-upload border'>
            <input type='file' id='upload' onChange={handleDocumentChange} />
            <MdPhoto className='photo-icon' />
            <label for='upload'>
              {selecteDocument ? 'File ready for upload' : 'Choose Cover Photo'}{' '}
            </label>
          </div>
          <p className='sm-p'>
            You can upload cover photo/ flyer in (jpg, png). Maximum file size
            is 10mb.
          </p>
          <button className='action-btn' type='submit'>
            {documentMutation.isPending ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#fff' }}
                height={20}
                width={20}
              />
            ) : (
              <>Upload Funding</>
            )}
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

export default AddFundingModal
