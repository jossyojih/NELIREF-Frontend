import { Navigate } from 'react-router-dom';
import userService from '../services/api/user';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { connections } from '../redux/reducers/userReducer';
import { useEffect } from 'react';
import logo from "../assets/images/Logo.png"

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['connections'],
    queryFn: userService.getConnections,
  });

  useEffect(() => {
    if (data) {
      dispatch(connections(data?.connections?.connections));
    }
    // Cleanup logic (if needed)
    return () => {
      // Perform cleanup when the component unmounts
    };
  }, [data?.connections?.connections]);

  // Get the JWT token from local storage
  const auth_token =
    localStorage.getItem('NELIREF') ||
    (localStorage.getItem('persist:root') &&
      JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token);

  localStorage.removeItem('NELIREF');

  if (isLoading) {
    // You might want to render a loading indicator here
    return (
      <div className="loading-overlay" style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img src={logo} alt="NELIREF" style={{
          maxWidth: "200px",
          maxHeight: "200px",
          animation: "pulse 2s infinite" // Adding animation directly in style
        }} />
        <style>
          {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
          `}
        </style>
      </div>
    )
  }

  if (!isLoading && isError) {
    // Handle error state here
    // return <p>Error loading connections: {isError.message}</p>;
    return <Navigate to='/login' />;
  }

  return auth_token ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
