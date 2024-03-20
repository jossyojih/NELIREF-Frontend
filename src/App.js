import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Error, Login, NewPassword, Register, ResetPassword } from './pages'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './pages/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'
import {
  Feeds,
  Resources,
  Groups,
  SharedLayout,
  Forum,
  Members,
  Fundings,
  OthersProfile,
  SingleGroup,
} from './pages/dashboard'
import Events from './pages/dashboard/Events'
import Notifications from './pages/dashboard/Notifications'
import Messages from './pages/dashboard/Messages'
import Profile from './pages/dashboard/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Feeds />} />
          <Route path='resources' element={<Resources />} />
          <Route path='groups' element={<Groups />} />
          <Route path='forum' element={<Forum />} />
          <Route path='events' element={<Events />} />
          <Route path='members' element={<Members />} />
          <Route path='fundings' element={<Fundings />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='messages' element={<Messages />} />
          <Route path='profile' element={<Profile />} />
          <Route path='user-profile/:id' element={<OthersProfile />} />
          <Route path='group/:id' element={<SingleGroup />} />
          {/*for other users*/}
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='new-password' element={<NewPassword />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  )
}

export default App
