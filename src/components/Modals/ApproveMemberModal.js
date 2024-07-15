import React from 'react';
import Wrapper from '../../assets/wrappers/SuccessModal';
import { RotatingLines } from 'react-loader-spinner';

const ApproveMemberModal = ({ onClose, action, isLoading, message }) => {

    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const contentStyle = {
        backgroundColor: 'white',
        width: '30%',
        overflow: 'hidden',
        borderRadius: '5px',
        padding: '1.5rem',
        textAlign: 'center',
    };

    const buttonContainerStyle = {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
    };

    const buttonStyle = {
        padding: '10px', // Added to make buttons same size
        cursor: 'pointer',
        minWidth: '100px',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'red',
        color: 'white',
    };

    return (
        <Wrapper style={modalStyle}>
            <div style={contentStyle}>
                <h3>Confirm Action!</h3>
                <p>{message ? message : "Click Approve to accept this user in this group."}</p>
                <div style={buttonContainerStyle}>
                    <button style={cancelButtonStyle} onClick={() => action("rejected")} disabled={isLoading}>
                        Reject
                    </button>
                    <button style={buttonStyle} onClick={() => action("approved")} disabled={isLoading}>
                        {isLoading ? (
                            <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} />
                        ) : ("Approve")}
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

export default ApproveMemberModal;
