import api from '../index.js'

class AdminOBJ {
  //update education
  createGroup = async (data) => {
    try {
      // Check if data is not empty

      const response = await api.put(`api/admin/groups`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get app members
  getMembers = async () => {
    try {
      // Check if data is not empty

      const response = await api.get('api/users/members')
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get user's feeds
  getFeeds = async (page, limit) => {
    try {
      // Check if data is not empty

      const response = await api.get(
        `api/users/feeds?page=${page}&limit=${limit}`
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get user's Connections
  getConnections = async () => {
    try {
      const response = await api.get(`api/users/my-connections`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get user's Connections
  sendConnectionRequest = async (receiverId) => {
    try {
      const response = await api.put(
        `api/users/${receiverId}/connection?status=request`
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get user's Connections
  handleConnectionRequest = async (receiverId, status) => {
    try {
      const response = await api.put(
        `api/users/${receiverId}/connection?status=${status}`
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get user's Notifications
  getNotifications = async () => {
    try {
      const response = await api.get(`api/users/notifications`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  // Update Single Group

  editGroup = async (params, data) => {
    try {
      // Check if data is not empty

      const response = await api.patch(`api/admin/groups/${params}`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Update Group Photo

  updateGroupPhoto = async (params, formData) => {
    try {
      const response = await api.patch(
        `/api/admin/groups/${params}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (err) {
      console.log(err)
      throw err?.response?.data || err.message
    }
  }
}

const admin = new AdminOBJ()
export default admin
