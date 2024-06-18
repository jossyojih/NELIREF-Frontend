import React from 'react'
import Wrapper from '../../assets/wrappers/SuccessModal'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { MdInsertPhoto } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import user from '../../services/api/admin'

const EditGroupPhoto = ({ onClose, id }) => {
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

  console.log("Hello " + id)
  const contentStyle = {
    backgroundColor: 'white',
    width: '30%',
    margin: 'auto',
    marginTop: '5%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '1.5rem',
  }

  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0])
  }

  const handlePhotoUpload = async (e) => {
    e.preventDefault()
    if (!selectedPhoto) {
      toast.error('Please select a file')
      return
    }
    if (selectedPhoto) {
      const formData = new FormData()
      formData.append('photo', selectedPhoto)

      try {
        await documentMutation.mutateAsync({
          params: id,
          formData,
        })
        setSelectedPhoto(null)
        onClose() // Reset selected file after upload
      } catch (error) {
        console.log(error)
      }
    }
  }

  const documentMutation = useMutation({
    mutationFn: ({ params, data }) => user.updateGroupPhoto(params, data),
    queryKey: ['get-photos'],
    onSuccess: (data) => {
      toast.success('Photo uploaded successfully')
      queryClient.invalidateQueries(['get-photos'])
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error(error?.message || 'An error occurred during document upload')
    },
  })

  return (
    <Wrapper style={modalStyle}>
      <form className='content-style' onSubmit={handlePhotoUpload}>
        <div className='heading'>
          <h3>Edit group Photo</h3>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className='drop-box'>
          <div className='photo-icon'>
            <MdInsertPhoto />
          </div>
          <p>
            {selectedPhoto
              ? 'File ready for upload'
              : 'Drag your photo here or click Upload to add photo'}
          </p>
          <div class='custom-file-upload'>
            <input type='file' id='upload' onChange={handlePhotoChange} />
            <label for='upload'>
              {selectedPhoto ? 'File ready for upload' : 'Choose file'}
            </label>
          </div>
        </div>
        <button className='action-btn' type='submit'>
          {documentMutation.isPending ? (
            <RotatingLines
              type='Oval'
              style={{ color: '#fff' }}
              height={20}
              width={20}
            />
          ) : (
            <>Upload photo</>
          )}
        </button>
      </form>
    </Wrapper>
  )
}

export default EditGroupPhoto
