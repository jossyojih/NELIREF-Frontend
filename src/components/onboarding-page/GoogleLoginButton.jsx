import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/jwtReducer";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import auth from '../../services/api/auth';
import { RotatingLines } from 'react-loader-spinner';
import { loginSuccess } from "../../redux/reducers/userReducer";

const GoogleLoginButton = ({ setShowProfile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            mutate(credentialResponse)
        },
        onError: () => {
            toast.error("Login error")
        }

    });

    const { mutate, isPending } = useMutation({
        mutationFn: auth.googleLogin,
        onSuccess: (data) => {
            // Handle successful login

            toast.success(data.message)
            if (data.status === "redirect") {
                return setShowProfile(data.token)
            }
            localStorage.setItem("NELIREF", data?.token);
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


    return (
        <button className='google' type='button' onClick={handleGoogleLogin}>
            {
                isPending ? (
                    <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} />
                ) : <><FcGoogle /> Continue with Google</>
            }

        </button>
    );
};

export default GoogleLoginButton;
