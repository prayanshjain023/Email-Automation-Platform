import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export async function getStats() {
  try {
    const response = await axios.get(`${API_URL}/stats/all`);
    const { templates, flows, sentEmails } = response.data;
    return { templates, flows, sentEmails };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      templates: 0,
      flows: 0,
      sentEmails: 0,
    };
  }
}


