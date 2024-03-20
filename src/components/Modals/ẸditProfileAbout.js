import React, { useState } from 'react';
import GenericModal from './GenericModal';
import Wrapper from '../../assets/wrappers/GroupsModal';
import { CgCloseR } from 'react-icons/cg';
import SuccessModal from './SuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { loginSuccess } from '../../redux/reducers/userReducer';
import { toast } from 'react-toastify';
import userService from '../../services/api/user';
import { RotatingLines } from 'react-loader-spinner';

const EditProfileAbout = ({ isOpen, onClose }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [description, setDescription] = useState(user?.about || "");
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    validateDescription(value);
  };

  const validateDescription = (value = description) => {
    if (value?.trim()?.length === 0) {
      setError('Description cannot be empty.');
      return false;
    } else if (value.length > 2000) {
      setError('Description should be less than 2000 characters.');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const mutation = useMutation({
    mutationFn: userService.updateAbout,
    onSuccess: (data) => {
      // Handle successful login
      dispatch(loginSuccess(data?.user));
      setMessage(data.message)
      openSuccessModal()
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error);

      toast.error(error)
      toast.error(error?.message)
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDescription()) {
      mutation.mutate({ about: description })
      // If there are no validation errors, submit the form
    }
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <div className='heading'>
          <h3>Edit About</h3>
          <CgCloseR onClick={onClose} className='icon' />
        </div>

        <form>
          <p>
            Write a brief about yourself, this allows those who would love to
            connect to you, know you more. Your brief can include your research
            interests, hobbies, and top skills.
          </p>
          <div>
            <textarea
              type='text'
              rows={10}
              placeholder='Enter description here'
              value={description}
              onChange={handleDescriptionChange}
            />
            <p>{description.length}/2000</p>
            <p className='error'>{error}</p>
          </div>
          <div className='btn'>
            <button onClick={handleSubmit}>
              {mutation.isPending ? (
                <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} />
              ) : (
                <>
                  Save
                </>

              )}
            </button>
          </div>
        </form>
        {isSuccessModalOpen ? (
          <SuccessModal onClose={closeSuccessModal} />
        ) : null}
      </Wrapper>
    </GenericModal>
  );
};

export default EditProfileAbout;
