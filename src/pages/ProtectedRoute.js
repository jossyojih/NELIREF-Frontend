import { Navigate } from 'react-router-dom';
import userService from '../services/api/user';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { connections } from '../redux/reducers/userReducer';
import { useEffect } from 'react';

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
    return <p>Loading...</p>;
  }

  if (isError) {
    // Handle error state here
    return <p>Error loading connections: {isError.message}</p>;
  }

  return auth_token ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
