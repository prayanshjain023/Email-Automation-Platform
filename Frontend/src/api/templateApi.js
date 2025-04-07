import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getTemplates() {
  try {
    const response = await axios.get(`${API_URL}/templates`)
    return response.data.templates
  } catch (error) {
    handleApiError(error)
  }
}

export async function getTemplate(id) {
  try {
    const response = await axios.get(`${API_URL}/templates/${id}`)
    return response.data.template
  } catch (error) {
    handleApiError(error)
  }
}

export async function createTemplate(templateData) {
  try {
    const response = await axios.post(`${API_URL}/templates/create`, templateData)
    return response.data.template
  } catch (error) {
    handleApiError(error)
  }
}

export async function updateTemplate(id, templateData) {
  try {
    const response = await axios.put(`${API_URL}/templates/${id}`, templateData)
    return response.data.template
  } catch (error) {
    handleApiError(error)
  }
}

export async function deleteTemplate(id) {
  try {
    const response = await axios.delete(`${API_URL}/templates/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

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

