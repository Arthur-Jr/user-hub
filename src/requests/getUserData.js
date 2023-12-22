import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function getUserData() {
  try {
    const response = await axios.get(`${BACKEND_URL}/user`, {
      withCredentials: true,
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

    return response.data;
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { message: 'Server is offline, it take atleast 3 minutes to start server!' };
    }

    return err.response.data;
  }
}
