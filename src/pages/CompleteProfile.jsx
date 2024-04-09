import React, { useState } from 'react'
import CreateAccountPage3 from '../components/onboarding-page/CreateAccountPage3'
import CreateAccountPage2 from '../components/onboarding-page/CreateAccountPage2'

import main from '../assets/images/main.jpeg'
import logo from '../assets/images/Logo.png'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useMutation } from '@tanstack/react-query';
import auth from '../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setToken } from "../redux/reducers/jwtReducer";
import ConfirmationModal from '../components/Modals/ConfirmationModal'
import { toast } from 'react-toastify'
import { loginSuccess } from "../redux/reducers/userReducer";

const CompleteProfile = ({ type, auth_token }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1)

    const [data, setData] = useState({

    })

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true)
    }

    const closeSuccessModal = () => {
        setIsConfirmModalOpen(false)
        // onClose()
    }

    const nextStep = () => {
        setStep(step => step + 1)
    }

    const prevStep = () => {
        setStep(step => step - 1)
    }

    const mutation = useMutation({
        mutationFn: auth.updateProfile,
        onSuccess: (data) => {
            // Handle successful login
            localStorage.setItem("NELIREF", data?.token);
            toast.success(data.message)
            dispatch(setToken(data?.token));
            dispatch(loginSuccess(data?.user));
            navigate("/", { replace: true })
        },
        onError: (error) => {
            // Handle login error
            console.error('Login error:', error);

            toast.error(error)
            toast.error(error?.message)
        },
    });

    const submitData = () => {
        mutation.mutate({ ...data, auth_token })
    }

    return (
        <div>
            <Wrapper>
                <article className='register-login-container'>
                    <article>
                        <img src={main} alt='hero-img' />
                    </article>
                    <article>
                        <section className='logo-container'>
                            <div className='logo'>
                                <img src={logo} alt='logo' />
                            </div>
                            <h5>NELIREF</h5>
                        </section>
                        <section>
                            <h2>Complete Profile</h2>
                            {step === 1 && <CreateAccountPage2 nextStep={nextStep} data={data} setData={setData} type={type} />}
                            {step === 2 && <CreateAccountPage3 prevStep={prevStep}
                                data={data}
                                setData={setData}
                                openConfirmModal={openConfirmModal}
                            />}
                        </section>
                    </article>
                </article>
            </Wrapper>
            {isConfirmModalOpen && (
                <ConfirmationModal onClose={closeSuccessModal} action={submitData} isLoading={mutation.isPending} />
            )}
        </div>
    )
}

export default CompleteProfile