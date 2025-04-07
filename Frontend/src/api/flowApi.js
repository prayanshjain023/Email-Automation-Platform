import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

export async function getFlows() {
  try {
    const response = await axios.get(`${API_URL}/flows`)
    return response.data.flows
  } catch (error) {
    handleApiError(error)
  }
}

export async function getFlow(id) {
  try {
    const response = await axios.get(`${API_URL}/flows/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export async function createFlow(flowData) {
  try {
    const response = await axios.post(`${API_URL}/flows/create`, flowData)
    return response.data.flows
  } catch (error) {
    handleApiError(error)
  }
}

export async function updateFlow(id, flowData) {
  try {
    const response = await axios.put(`${API_URL}/flows/${id}`, flowData)
    return response.data.flows
  } catch (error) {
    handleApiError(error)
  }
}

export async function deleteFlow(id) {
  try {
    const response = await axios.delete(`${API_URL}/flows/delete${id}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export async function runFlow(flowId, recipientEmail) {
  try {
    const response = await axios.post(`${API_URL}/flows/runflow`, {
      flowId,
      recipientEmail,
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

// Error handling
function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || "An error occurred")
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response from server. Please check your connection.")
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error("Error setting up request. Please try again.")
  }
}

