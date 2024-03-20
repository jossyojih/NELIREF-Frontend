import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


const initialState = {
  isLoading: false,
  isSidebarOpen: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
})

export const { toggleSidebar } = userSlice.actions
export default userSlice.reducer
