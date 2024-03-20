import React, { useState } from 'react';
import GenericModal from './GenericModal';
import Wrapper from '../../assets/wrappers/GroupsModal';
import { CgCloseR } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from './SuccessModal';
import * as isoCountries from 'i18n-iso-countries';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginSuccess } from "../../redux/reducers/userReducer";
import userService from '../../services/api/user';
import { RotatingLines } from 'react-loader-spinner';

// Load English language for country names
isoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const EditProfileDetailsModal = ({ isOpen, onClose }) => {
  const allCountries = Object.entries(isoCountries.getNames('en'));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    user_name: user.user_name || '',
    DOB: user.DOB || '',
    country: user.country || '',
    state: user.state || '',
  });
  const [formErrors, setFormErrors] = useState({});
  const countries = require('i18n-iso-countries');

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);

  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    // Perform your form validation here
    // For simplicity, let's assume all fields are required
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });
    return errors;
  };

  const mutation = useMutation({
    mutationFn: userService.updateProfile,
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormErrors({})
      // If there are no validation errors, submit the form
      mutation.mutate(formData)
    } else {
      // If there are validation errors, set them in the state
      setFormErrors(validationErrors);
    }
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <div className="heading">
          <h3>Edit Personal Details</h3>
          <CgCloseR onClick={onClose} className="icon" />
        </div>

        <form onSubmit={handleSubmit}>
          <p>
            <span className="asterix">*</span> indicates fields that are
            compulsory.
          </p>
          <div>
            <label>
              Full name <span className="asterix">*</span>
            </label>
            <input
              type="text"
              placeholder="Luper"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.full_name}</p>
          </div>
          <div>
            <label>
              Username <span className="asterix">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g: joey"
              name="user_name"
              value={formData.user_name}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.user_name}</p>
          </div>
          <div>
            <label>
              Date of Birth <span className="asterix">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              name="DOB"
              value={formData.DOB}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.DOB}</p>
          </div>
          <div>
            <label>
              Country <span className="asterix">*</span>
            </label>

            <select onChange={handleInputChange} value={formData.country} name='country'>
              <option value="">Select a country</option>
              {allCountries.map(([countryCode, countryName]) => (
                <option key={countryCode} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
            <p className="error">{formErrors.country}</p>
          </div>
          <div>
            <label>
              City/State <span className="asterix">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g: Georgia"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.state}</p>
          </div>
          <div className="btn">
            <button type="submit">
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
        {isSuccessModalOpen && (
          <SuccessModal onClose={closeSuccessModal} message={message} />
        )}
      </Wrapper>
    </GenericModal>
  );
};

export default EditProfileDetailsModal;
