import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function resetPassword(token, userData) {
  try {
    const data = { password: userData.password };
    const response = await axios.put(`${BACKEND_URL}/user/reset`, data, {
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
        'authorization': token
      },
    });

    return { message: 'Password Reseted', status: response.status };
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { message: 'Server is offline, it take atleast 3 minutes to start server!', status: 500 };
    }

    return { message: err.response.data.message, status: err.response.status };
  }
}
